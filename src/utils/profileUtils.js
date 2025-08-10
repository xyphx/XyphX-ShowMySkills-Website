// Utility functions for profile management

export const generateProfileUrl = (username) => {
  if (!username) return '/';
  // Remove @ symbol if present and ensure clean username
  const cleanUsername = username.replace(/^@/, '');
  return `/${encodeURIComponent(cleanUsername)}`;
};

export const formatUsername = (username) => {
  if (!username) return '';
  // Ensure username starts with @ for display
  return username.startsWith('@') ? username : `@${username}`;
};

export const getCleanUsername = (username) => {
  if (!username) return '';
  // Remove @ symbol for storage/API calls
  return username.replace(/^@/, '');
};
