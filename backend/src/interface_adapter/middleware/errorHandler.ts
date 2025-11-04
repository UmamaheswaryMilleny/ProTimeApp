import { NextFunction, Request, Response } from "express";
import { DomainError } from "../../domain/errors/DomainError";
import { UserAlreadyExistError } from "../../domain/errors/UserAlreadyExistError";
import { HttpStatusCode } from "../../application/constants/statusCodes";
import { logger } from "../../infrastructure/config/dependencies";
import { InvalidOTPError } from "../../domain/errors/InvalidOTPError";
import { OtpExpiredError } from "../../domain/errors/OtpExpiredError";

/**
 * Global Express error handler
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // If DomainError (business error), respond with 4xx
  if (err instanceof DomainError) {
    // specific mapping
    if (err instanceof UserAlreadyExistError) {
      logger.warn(err.message);
      return res.status(HttpStatusCode.CONFLICT).json({ message: err.message });
    }

    logger.warn(err.message);
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: err.message });
  }
if (err instanceof InvalidOTPError) {
  logger.warn(err.message);
  return res.status(HttpStatusCode.BAD_REQUEST).json({ message: err.message });
}

if (err instanceof OtpExpiredError) {
  logger.warn(err.message);
  return res.status(HttpStatusCode.GONE).json({ message: err.message });
}
  // Unknown/system errors
  // logger.error("Unhandled error in request", err);
  logger.error(`Unhandled error in request: ${err instanceof Error ? err.message : String(err)}`);
if (err instanceof Error && err.stack) {
  logger.error(err.stack);
}
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });

  
}















// // import { Request, Response, NextFunction } from "express";

// // export const errorHandler = (
// //   err: Error,
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   console.error(err);
// //   res.status(500).json({ error: err.message || "Internal server error" });
// // };
// // src/interface_adapter/middlewares/errorHandler.ts
// import { Request, Response, NextFunction } from "express";

// interface AppError extends Error {
//   statusCode?: number;
// }

// export function errorHandler(
//   err: AppError,
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): void {
//   console.error("Error caught by middleware:", err);

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";

//   res.status(statusCode).json({
//     success: false,
//     message,
//   });
// }
