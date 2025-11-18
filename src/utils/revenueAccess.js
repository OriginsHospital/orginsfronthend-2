/**
 * List of allowed emails for Revenue and Revenue New reports
 */
const ALLOWED_REVENUE_EMAILS = [
  'karun@gmail.com',
  'originsivf@gmail.com',
  'nikhilsuvva77@gmail.com',
]

/**
 * Checks if a user email has access to Revenue reports
 * @param {string} userEmail - The user's email address
 * @returns {boolean} - True if the user has access, false otherwise
 */
export function hasRevenueAccess(userEmail) {
  if (!userEmail) {
    return false
  }
  return ALLOWED_REVENUE_EMAILS.includes(userEmail.toLowerCase().trim())
}
