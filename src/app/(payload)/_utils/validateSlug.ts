import slugify from 'slugify'

const validateSlug = (value: string | null | undefined) => {
  if (value?.startsWith('/') || value?.endsWith('/')) {
    return 'Slug must not contain leading or trailing slashes'
  }

  const disallowedSpecialChars = /[^a-z0-9-/]/g // Only allow alphanumeric characters, hyphens, and slashes
  const disAllowedMatches = value?.match(disallowedSpecialChars)
  if (value && disAllowedMatches !== null) {
    return 'Slug must contain only lowercase letters (a-z), numbers (0-9), hyphens (-), and slashes(/).'
  }

  return true
}

export default validateSlug
