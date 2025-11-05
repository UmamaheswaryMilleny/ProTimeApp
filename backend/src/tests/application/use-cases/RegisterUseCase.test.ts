// tests/application/use-cases/RegisterUseCase.test.ts
import { RegisterUseCase } from '../../../application/use-cases/user/RegisterUserUseCase';
import { Provider } from '../../../domain/enums/UserEnums';
import { RegisterUserDTO } from '../../../application/dtos/user/UserDTO';
import { UserAlreadyExistError } from '../../../domain/errors/UserAlreadyExistError';
import { ResponseMessages } from '../../../application/constants/ResponseMessages';
import { createMock } from '../../utils/createMock';
import { IUserRepository } from '../../../application/interfaces/repository/IUserRepository';
import { IPasswordService } from '../../../application/interfaces/services/IPasswordService';
import { IOtpService } from '../../../application/interfaces/services/IOtpService';
import { IEmailService } from '../../../application/interfaces/services/IEmailService';
import { ICacheService } from '../../../application/interfaces/services/ICacheService';
import { IDomainEventPublisher } from '../../../application/interfaces/repository/IDomainEventPublisher';
import { ILogger } from '../../../application/interfaces/ILogger';
import { User } from '../../../domain/entities/User';

// A 60-character bcrypt-like string
const VALID_BCRYPT_HASH =
  '$2b$10$abcdefghijklmnopqrstuv1234567890xyzABCDEFGHIJKLMN12';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordService: jest.Mocked<IPasswordService>;
  let otpService: jest.Mocked<IOtpService>;
  let emailService: jest.Mocked<IEmailService>;
  let cacheService: jest.Mocked<ICacheService>;
  let domainEventPublish: jest.Mocked<IDomainEventPublisher>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    userRepository = createMock<IUserRepository>();
    passwordService = createMock<IPasswordService>();
    otpService = createMock<IOtpService>();
    emailService = createMock<IEmailService>();
    cacheService = createMock<ICacheService>();
    domainEventPublish = createMock<IDomainEventPublisher>();
    logger = createMock<ILogger>();

    registerUseCase = new RegisterUseCase(
      userRepository,
      passwordService,
      otpService,
      emailService,
      cacheService,
      domainEventPublish,
      logger
    );

    jest.clearAllMocks();
  });

  it('should register a new local user successfully', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValueOnce(null);
    passwordService.hashPassword.mockResolvedValueOnce(VALID_BCRYPT_HASH);
    otpService.generateOtp.mockResolvedValueOnce('123456');
    userRepository.save.mockResolvedValueOnce(undefined); // not used for local flow
    cacheService.set.mockResolvedValue(undefined);
    emailService.sendOtp.mockResolvedValue(undefined);
    domainEventPublish.publishEvents.mockResolvedValue(undefined);

    const dto: RegisterUserDTO = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      provider: Provider.LOCAL,
    };

    // Act
    const result = await registerUseCase.execute(dto);

    // Assert
    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'alice@example.com' })
    );
    expect(passwordService.hashPassword).toHaveBeenCalledWith('Password123!');

    // IMPORTANT: local registration should NOT persist user yet (will wait for OTP verify)
    expect(userRepository.save).not.toHaveBeenCalled();

    // cache should have been used to store OTP and temp user
    expect(cacheService.set).toHaveBeenCalledTimes(2);
    // one of the cache.set calls should store otp:register:<email>
    expect(cacheService.set).toHaveBeenCalledWith(
      expect.stringContaining('otp:register:alice@example.com'),
      '123456',
      expect.any(Number)
    );
    // the other should store user:temp:<email>
    expect(cacheService.set).toHaveBeenCalledWith(
      expect.stringContaining('user:temp:alice@example.com'),
      expect.any(String),
      expect.any(Number)
    );

    expect(emailService.sendOtp).toHaveBeenCalledWith('alice@example.com', '123456');
    expect(domainEventPublish.publishEvents).toHaveBeenCalled();
    expect(result.message).toBe(ResponseMessages.RegistrationSuccessEmail);
    expect(result.isOtpRequired).toBe(true);
  });

  it('should throw UserAlreadyExistError if user already exists', async () => {
    const existingUser = {
      id: { value: 'existing-id' },
      email: { value: 'alice@example.com' },
    } as unknown as User;

    userRepository.findByEmail.mockResolvedValueOnce(existingUser);

    const dto: RegisterUserDTO = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      provider: Provider.LOCAL,
    };

    await expect(registerUseCase.execute(dto)).rejects.toThrow(UserAlreadyExistError);

    expect(passwordService.hashPassword).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should register a Google user without OTP', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null);
    userRepository.save.mockResolvedValueOnce(undefined);
    domainEventPublish.publishEvents.mockResolvedValueOnce(undefined);

    const dto: RegisterUserDTO = {
      name: 'GoogleUser',
      email: 'google@example.com',
      password: '',
      confirmPassword: '',
      googleId: 'google-123',
      provider: Provider.GOOGLE,
    };

    const result = await registerUseCase.execute(dto);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'google@example.com' })
    );
    expect(userRepository.save).toHaveBeenCalled();
    expect(domainEventPublish.publishEvents).toHaveBeenCalled();
    expect(passwordService.hashPassword).not.toHaveBeenCalled();
    expect(otpService.generateOtp).not.toHaveBeenCalled();
    expect(result.message).toBe(ResponseMessages.RegistrationSuccessGoogle);
    expect(result.isOtpRequired).toBe(false);
  });
});

