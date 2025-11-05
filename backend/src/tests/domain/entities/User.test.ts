import { EmailUser ,GoogleUser } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { UserId } from "../../../domain/value-objects/UserId";
import { OTP } from "../../../domain/value-objects/OTP";
import { UserStatus,Provider,OtpPurpose } from "../../../domain/enums/UserEnums";
import { InvalidUserNameError } from "../../../domain/errors/InvalidUserNameError";
import { SamePasswordError } from "../../../domain/errors/SamePasswordError";
import { GoogleIdError } from "../../../domain/errors/GoogleIdError";
import { UserVerifiedEvent } from "../../../domain/events/UserVerifiedEvent";
import { UserPasswordChangedEvent } from "../../../domain/events/UserPasswordChangedEvent";
import { OTPGeneratedEvent } from "../../../domain/events/OTPGeneratedEvent";

describe("EmailUser Entity", () => {
  const userId = UserId.create();
  const email = Email.create("test@example.com");
  const password = Password.fromHash("hashedpasswordvalue123");

  it("should create a valid EmailUser", () => {
    const user = EmailUser.create(userId, "John", email, password);
    expect(user.name).toBe("John");
    expect(user.email.value).toBe("test@example.com");
    expect(user.password.hash).toBe("hashedpasswordvalue123");
    expect(user.status).toBe(UserStatus.PENDING_VERIFICATION);
    expect(user.provider).toBe(Provider.LOCAL);
  });

  it("should throw InvalidUserNameError for invalid name", () => {
    expect(() => EmailUser.create(userId, "", email, password)).toThrow(InvalidUserNameError);
  });

  it("should generate an OTP event", () => {
    const user = EmailUser.create(userId, "John", email, password);
    const otp = OTP.create("123456", new Date(Date.now() + 60_000), OtpPurpose.REGISTER);
    user.generateOTP(otp);

    const events = user.events;
    expect(events.length).toBe(1);
    expect(events[0]).toBeInstanceOf(OTPGeneratedEvent);
    expect((events[0] as OTPGeneratedEvent).otpValue).toBe("123456");
  });

  it("should add UserPasswordChangedEvent when password is changed", () => {
    const user = EmailUser.create(userId, "John", email, password);
    const newPassword = Password.fromHash("newhashedpasswordvalue");

    user.changeHashedPassword(newPassword);

    const events = user.events;
    expect(events[0]).toBeInstanceOf(UserPasswordChangedEvent);
    expect((events[0] as UserPasswordChangedEvent).hashedPassword).toBe("newhashedpasswordvalue");
  });

  it("should throw SamePasswordError when new password equals current", () => {
    const user = EmailUser.create(userId, "John", email, password);
    expect(() => user.changeHashedPassword(password)).toThrow(SamePasswordError);
  });

  it("should verify user and add UserVerifiedEvent", () => {
    const user = EmailUser.create(userId, "John", email, password);
    user.verifyUser();

    expect(user.isVerified).toBe(true);
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.events[0]).toBeInstanceOf(UserVerifiedEvent);
  });

  it("should clear events after clearEvents() call", () => {
    const user = EmailUser.create(userId, "John", email, password);
    user.verifyUser();
    expect(user.events.length).toBeGreaterThan(0);

    user.clearEvents();
    expect(user.events.length).toBe(0);
  });
});

describe("GoogleUser Entity", () => {
  const userId = UserId.create();
  const email = Email.create("google@example.com");

  it("should create a valid GoogleUser", () => {
    const googleUser = GoogleUser.create(userId, "Alice", email, "google-123");
    expect(googleUser.name).toBe("Alice");
    expect(googleUser.googleId).toBe("google-123");
    expect(googleUser.provider).toBe(Provider.GOOGLE);
    expect(googleUser.status).toBe(UserStatus.ACTIVE);
  });

  it("should throw InvalidUserNameError for invalid name", () => {
    expect(() => GoogleUser.create(userId, "", email, "google-123")).toThrow(InvalidUserNameError);
  });

  it("should throw GoogleIdError if googleId missing", () => {
    expect(() => GoogleUser.create(userId, "Alice", email, "")).toThrow(GoogleIdError);
  });
});
