// tests/application/use-cases/VerifyOtpUsecase.test.ts
import { VerifyOtpUsecase } from '../../../application/use-cases/user/VerifyOtpUseCase';
import { createMock } from '../../utils/createMock';
import { IUserRepository } from '../../../application/interfaces/repository/IUserRepository';
import { ITokenService } from '../../../application/interfaces/services/ITokenService';
import { ICacheService } from '../../../application/interfaces/services/ICacheService';
import { IOtpService } from '../../../application/interfaces/services/IOtpService';
import { IDomainEventPublisher } from '../../../application/interfaces/repository/IDomainEventPublisher';
import { ILogger } from '../../../application/interfaces/ILogger';
import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
import { OtpExpiredError } from '../../../domain/errors/OtpExpiredError';
import { ResponseMessages } from '../../../application/constants/ResponseMessages';
import { OtpPurpose } from '../../../domain/enums/UserEnums';

// ✅ valid bcrypt-style hash for Password.fromHash()
const VALID_BCRYPT_HASH =
  '$2b$10$abcdefghijklmnopqrstuv1234567890xyzABCDEFGHIJKLMN12';

describe('VerifyOtpUsecase', () => {
  let verifyOtpUsecase: VerifyOtpUsecase;
  let userRepository: jest.Mocked<IUserRepository>;
  let tokenService: jest.Mocked<ITokenService>;
  let cacheService: jest.Mocked<ICacheService>;
  let otpService: jest.Mocked<IOtpService>;
  let domainEventPublish: jest.Mocked<IDomainEventPublisher>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    userRepository = createMock<IUserRepository>();
    tokenService = createMock<ITokenService>();
    cacheService = createMock<ICacheService>();
    otpService = createMock<IOtpService>();
    domainEventPublish = createMock<IDomainEventPublisher>();
    logger = createMock<ILogger>();

    verifyOtpUsecase = new VerifyOtpUsecase(
      userRepository,
      tokenService,
      cacheService,
      otpService,
      domainEventPublish,
      logger
    );

    jest.clearAllMocks();
  });

  it('should verify OTP successfully and save the user', async () => {
    // Arrange
    const email = 'test@example.com';
    const otp = '123456';

    const cachedUser = JSON.stringify({
      id: 'user-id-123',
      name: 'Alice',
      email,
      passwordHash: VALID_BCRYPT_HASH,
      provider: 'local',
    });

    cacheService.get.mockImplementation(async (key) => {
      if (key === `user:temp:${email}`) return cachedUser;
      return null;
    });

    otpService.verifyOtp.mockResolvedValueOnce(true);
    userRepository.save.mockResolvedValueOnce(undefined);
    domainEventPublish.publishEvents.mockResolvedValueOnce(undefined);
    cacheService.delete.mockResolvedValue(undefined);

    // Act
    const result = await verifyOtpUsecase.execute({ email, otp });

    // Assert
    expect(cacheService.get).toHaveBeenCalledWith(`user:temp:${email}`);
    expect(otpService.verifyOtp).toHaveBeenCalledWith(email, otp, OtpPurpose.REGISTER);
    expect(userRepository.save).toHaveBeenCalled();
    expect(domainEventPublish.publishEvents).toHaveBeenCalled();
    expect(cacheService.delete).toHaveBeenCalledWith(`otp:register:${email}`);
    expect(cacheService.delete).toHaveBeenCalledWith(`user:temp:${email}`);
    expect(result).toEqual({
      email,
      message: ResponseMessages.OtpVerified,
    });
  });

  it('should throw InvalidOTPError if OTP is invalid', async () => {
    const email = 'test@example.com';
    const otp = '000000';

    const cachedUser = JSON.stringify({
      id: 'user-id-123',
      name: 'Alice',
      email,
      passwordHash: VALID_BCRYPT_HASH,
    });

    cacheService.get.mockResolvedValueOnce(cachedUser);
    otpService.verifyOtp.mockResolvedValueOnce(false);

    await expect(verifyOtpUsecase.execute({ email, otp })).rejects.toThrow(InvalidOTPError);

    expect(userRepository.save).not.toHaveBeenCalled();
    expect(domainEventPublish.publishEvents).not.toHaveBeenCalled();
  });

  it('should throw OtpExpiredError if no cached user found', async () => {
    const email = 'missing@example.com';
    const otp = '123456';

    cacheService.get.mockResolvedValueOnce(null);

    await expect(verifyOtpUsecase.execute({ email, otp })).rejects.toThrow(OtpExpiredError);

    expect(otpService.verifyOtp).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
