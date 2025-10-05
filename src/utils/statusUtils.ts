import { StatusOption } from '../modules/Projects/hooks/useProjectFilters';

/**
 * Calculate the brightness of a color and determine if it's light or dark
 * @param hexColor - Hex color code (e.g., '#FF0000')
 * @returns true if the color is light, false if dark
 */
const isLightColor = (hexColor: string): boolean => {
  // Remove the # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance using the formula from WCAG
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if luminance is greater than 0.5 (light color)
  return luminance > 0.5;
};

/**
 * Get color for a given status name from the available status options
 * @param statusName - The name of the status
 * @param statusOptions - Array of status options with colors (can be objects or strings)
 * @returns The color for the status, or default gray if not found
 */
export const getStatusColor = (statusName: string, statusOptions: (StatusOption | string)[]): string => {
  const status = statusOptions.find(option => {
    if (typeof option === 'string') {
      return option === statusName;
    } else {
      return option.name === statusName;
    }
  });
  
  if (typeof status === 'string') {
    return '#757575'; // Default gray color for string format
  } else {
    return status?.color || '#757575'; // Default gray color
  }
};

/**
 * Get appropriate text color (black or white) based on background color brightness
 * @param backgroundColor - Hex color code for the background
 * @returns '#000000' for light backgrounds, '#FFFFFF' for dark backgrounds
 */
export const getTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
};

