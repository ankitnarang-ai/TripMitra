import type { Request } from "express";
import { ApiResponse } from "../response/index.js";

/**
 * Extract ID from request params or query
 * @param req - Express request object
 * @param paramName - Parameter name to look for (default: 'id')
 * @param errorMessage - Custom error message
 * @returns The extracted ID as string
 */
export const extractId = (
  req: Request,
  paramName: string = 'id',
  errorMessage?: string
): string => {
  const id = req.params[paramName] || req.query[paramName];
  if (!id) {
    throw new Error(errorMessage || `${paramName} is required`);
  }
  return String(id).trim();
};

/**
 * Validate request user object and required fields based on role
 * @param req - Request object with user attached
 * @throws Error if validation fails
 */
export const validateReqUser = (req: any) => {
  // Check if user object exists
  if (!req.user) {
    throw new Error('User authentication required');
  }

  // Check required fields for all users
  if (!req.user.id || !req.user.role) {
    throw new Error('User ID and User Role are required');
  }

  // Check if id and role are not empty strings
  if (String(req.user.id).trim() === '' || String(req.user.role).trim() === '') {
    throw new Error('User ID and User Role cannot be empty');
  }

  // Check organizationId requirement for specific roles
  if (req.user.role === 'admin' || req.user.role === 'team_member') {
    if (!req.user.organizationId || String(req.user.organizationId).trim() === '') {
      throw new Error('Organization ID is required for admin and team member roles');
    }
  }
};