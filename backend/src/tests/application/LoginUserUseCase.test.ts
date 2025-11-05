// tests/application/use-cases/LoginUserUseCase.test.ts
import { LoginUserUseCase } from '../../application/use-cases/user/LoginUserUseCase';
import { createMock } from '../utils/createMock';
import { IUserRepository } from '../../application/interfaces/repository/IUserRepository';
import { IPasswordService } from '../../application/interfaces/services/IPasswordService';
import { ITokenService } from '../../application/interfaces/services/ITokenService';
import { ILogger } from '../../application/interfaces/ILogger';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';
import { ResponseMessages } from '../../application/constants/ResponseMessages';
import { EmailUser } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';
import { UserRole,Provider,UserStatus } from '../../domain/enums/UserEnums';

const VALID_HASH =
  '$2b$10$abcdefghijklmnopqrstuv1234567890xyzABCDEFGHIJKLMN12';

describe('LoginUserUseCase', () => {
  let loginUseCase: LoginUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordService: jest.Mocked<IPasswordService>;
  let tokenService: jest.Mocked<ITokenService>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    userRepository = createMock<IUserRepository>();
    passwordService = createMock<IPasswordService>();
    tokenService = createMock<ITokenService>();
    logger = createMock<ILogger>();

    loginUseCase = new LoginUserUseCase(
      userRepository,
      passwordService,
      tokenService,
      logger
    );

    jest.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    const emailVO = Email.create('test@example.com');
    const passwordVO = Password.fromHash(VALID_HASH);
    const user = EmailUser.restore(
      UserId.create('123'),
      'Alice',
      emailVO,
      passwordVO,
      UserRole.USER,
      UserStatus.ACTIVE,
      true,
      Provider.LOCAL
    );

    userRepository.findByEmail.mockResolvedValueOnce(user);
    passwordService.comparePassword.mockResolvedValueOnce(true);
    tokenService.generateAccessToken.mockResolvedValueOnce('access123');
    tokenService.generateRefreshToken.mockResolvedValueOnce('refresh123');

    const result = await loginUseCase.execute({
      email: 'test@example.com',
      password: 'Password123!',
      accessToken: '',
      refreshToken: '',
    });

    expect(userRepository.findByEmail).toHaveBeenCalled();
    expect(passwordService.comparePassword).toHaveBeenCalledWith(
      'Password123!',
      VALID_HASH
    );
    expect(tokenService.generateAccessToken).toHaveBeenCalled();
    expect(tokenService.generateRefreshToken).toHaveBeenCalled();
    expect(result.message).toBe(ResponseMessages.LoginSuccess);
    expect(result.accessToken).toBe('access123');
    expect(result.refreshToken).toBe('refresh123');
  });

  it('should throw InvalidCredentialsError if user not found', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null);

    await expect(
      loginUseCase.execute({
        email: 'notfound@example.com',
        password: 'wrongpass',
        accessToken: '',
        refreshToken: '',
      })
    ).rejects.toThrow(InvalidCredentialsError);

    expect(passwordService.comparePassword).not.toHaveBeenCalled();
  });

  it('should throw InvalidCredentialsError if user not verified', async () => {
    const emailVO = Email.create('test@example.com');
    const passwordVO = Password.fromHash(VALID_HASH);
    const unverifiedUser = EmailUser.restore(
      UserId.create('123'),
      'Alice',
      emailVO,
      passwordVO,
      UserRole.USER,
      UserStatus.PENDING_VERIFICATION,
      false,
      Provider.LOCAL
    );

    userRepository.findByEmail.mockResolvedValueOnce(unverifiedUser);

    await expect(
      loginUseCase.execute({
        email: 'test@example.com',
        password: 'Password123!',
        accessToken: '',
        refreshToken: '',
      })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidCredentialsError if password is incorrect', async () => {
    const emailVO = Email.create('test@example.com');
    const passwordVO = Password.fromHash(VALID_HASH);
    const user = EmailUser.restore(
      UserId.create('123'),
      'Alice',
      emailVO,
      passwordVO,
      UserRole.USER,
      UserStatus.ACTIVE,
      true,
      Provider.LOCAL
    );

    userRepository.findByEmail.mockResolvedValueOnce(user);
    passwordService.comparePassword.mockResolvedValueOnce(false);

    await expect(
      loginUseCase.execute({
        email: 'test@example.com',
        password: 'WrongPass123!',
        accessToken: '',
        refreshToken: '',
      })
    ).rejects.toThrow(InvalidCredentialsError);
  });

it('should reuse existing tokens if both valid', async () => {
  const emailVO = Email.create('test@example.com');
  const passwordVO = Password.fromHash(VALID_HASH);
  const user = EmailUser.restore(
    UserId.create('123'),
    'Alice',
    emailVO,
    passwordVO,
    UserRole.USER,
    UserStatus.ACTIVE,
    true,
    Provider.LOCAL
  );

  userRepository.findByEmail.mockResolvedValueOnce(user);
  passwordService.comparePassword.mockResolvedValueOnce(true);

  // ✅ Return valid payloads (not booleans)
  tokenService.verifyAccessToken.mockResolvedValueOnce({
    userId: '123',
    email: 'test@example.com',
    role: UserRole.USER,
  });
  tokenService.verifyRefreshToken.mockResolvedValueOnce({
    userId: '123',
    email: 'test@example.com',
    role: UserRole.USER,
  });

  const result = await loginUseCase.execute({
    email: 'test@example.com',
    password: 'Password123!',
    accessToken: 'access123',
    refreshToken: 'refresh123',
  });

  // ✅ Confirm that existing tokens were reused (not regenerated)
  expect(tokenService.verifyAccessToken).toHaveBeenCalledWith('access123');
  expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith('refresh123');
  expect(tokenService.generateAccessToken).not.toHaveBeenCalled(); // ✅ Fix here
  expect(tokenService.generateRefreshToken).not.toHaveBeenCalled(); // ✅ Fix here
  expect(result.accessToken).toBe('access123');
  expect(result.refreshToken).toBe('refresh123');
  expect(result.message).toBe(ResponseMessages.LoginSuccess);
});

});