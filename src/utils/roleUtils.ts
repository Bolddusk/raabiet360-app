/**
 * Centralized role utility functions
 * This file contains all role-related logic to ensure consistency across the app
 * If role logic needs to change, only update this file
 */

export interface UserRole {
  id?: number;
  role_name?: string;
  [key: string]: any;
}

/**
 * Check if user has driver role
 * @param userRole - The user's role object
 * @returns boolean - true if user is a driver
 */
export const isDriver = (userRole?: UserRole): boolean => {
  if (!userRole?.role_name) return false;
  return userRole.role_name.toLowerCase().includes('driver');
};

/**
 * Check if user has worker role
 * @param userRole - The user's role object
 * @returns boolean - true if user is a worker
 */
export const isWorker = (userRole?: UserRole): boolean => {
  if (!userRole?.role_name) return false;
  return userRole.role_name.toLowerCase().includes('worker');
};

/**
 * Check if user has a specific role by name (case-insensitive contains check)
 * @param userRole - The user's role object
 * @param roleName - The role name to check for
 * @returns boolean - true if user has the specified role
 */
export const hasRole = (userRole?: UserRole, roleName: string): boolean => {
  if (!userRole?.role_name || !roleName) return false;
  return userRole.role_name.toLowerCase().includes(roleName.toLowerCase());
};

/**
 * Get user role name in lowercase
 * @param userRole - The user's role object
 * @returns string - role name in lowercase or empty string
 */
export const getRoleName = (userRole?: UserRole): string => {
  return userRole?.role_name?.toLowerCase() || '';
};

/**
 * Check if user has any of the specified roles
 * @param userRole - The user's role object
 * @param roleNames - Array of role names to check for
 * @returns boolean - true if user has any of the specified roles
 */
export const hasAnyRole = (userRole?: UserRole, roleNames: string[]): boolean => {
  if (!userRole?.role_name || !roleNames.length) return false;
  const userRoleLower = userRole.role_name.toLowerCase();
  return roleNames.some(role => userRoleLower.includes(role.toLowerCase()));
};
