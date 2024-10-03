export default function isValidEmailFormat(email: string): boolean {
  // This regex checks for at least one character before @,
  // at least one character after @, and at least one character after a dot
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
