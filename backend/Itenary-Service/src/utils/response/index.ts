import type { Response } from "express";

export class ApiResponse {
  // Success response
  static success(res: Response, data: any = {}, message = "Success", status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  // Error response
  static error(res: Response, message = "Something went wrong", status = 500, error: any = null) {
    return res.status(status).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === "development" && error ? { error } : {}),
    });
  }
}
