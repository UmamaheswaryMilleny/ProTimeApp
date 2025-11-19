import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../../domain/errors/DomainError';
import { UserAlreadyExistError } from '../../domain/errors/UserAlreadyExistError';
import { HttpStatusCode } from '../../application/constants/statusCodes';
import { logger } from '../../infrastructure/config/dependencies';
import { OtpExpiredError } from '../../domain/errors/OtpExpiredError';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof DomainError) {
    if (err instanceof UserAlreadyExistError) {
      logger.warn(err.message);
      return res.status(HttpStatusCode.CONFLICT).json({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
      logger.warn(err.message);
      return res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: err.message });
    }
    if (err instanceof OtpExpiredError) {
      logger.warn(err.message);
      return res.status(HttpStatusCode.GONE).json({ message: err.message });
    }
    logger.warn(err.message);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: err.message });
  }

  logger.error(
    `Unhandled error in request: ${err instanceof Error ? err.message : String(err)}`
  );
  if (err instanceof Error && err.stack) {
    logger.error(err.stack);
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
}

