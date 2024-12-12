import slugify from 'slugify'

const validateSlug = (value: string | null | undefined) => {
  if (value?.startsWith('/') || value?.endsWith('/')) {
    return 'Slug must not contain leading or trailing slashes'
  }

  const disallowedSpecialChars = /[^a-z0-9-]/g // Only allow alphanumeric characters and hyphens
  const disAllowedMatches = value?.match(disallowedSpecialChars)
  if (value && disAllowedMatches !== null) {
    return 'Slug must contain only letters (a-z), numbers (0-9), and hyphens (-). Special characters and spaces are not allowed.'
  }

  return true
}

export default validateSlug
