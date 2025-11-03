// src/interface-adapters/middlewares/validateRequest.ts
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { HttpStatusCode } from "../../application/constants/statusCodes";

/**
 * validateRequest(schema)
 * - schema: a Zod schema (use your RegisterUserSchema from application/validators)
 * - On success: stores parsed data in res.locals.validatedBody and calls next()
 * - On failure: returns 400 with structured errors
 */
export const validateRequest = (schema: ZodType<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Invalid request data",
          details: err.errors,
        });
      }
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid request data",
        details: err instanceof Error ? err.message : err,
      });
    }
  };
};
