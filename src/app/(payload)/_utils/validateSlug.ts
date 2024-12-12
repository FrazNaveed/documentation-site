import slugify from 'slugify'

const validateSlug = (value: string | null | undefined) => {
  if (value?.startsWith('/') || value?.endsWith('/')) {
    return 'Slug must not contain leading or trailing slashes'
  }

  const disallowedSpecialChars = /[^A-Za-z0-9-]/g // Only allow alphanumeric characters and hyphens
  const disAllowedMatches = value?.match(disallowedSpecialChars)
  if (value && disAllowedMatches !== null) {
    return 'Special characters and spaces are not allowed. Please use only letters, numbers, and hyphens.'
  }

  return true
}

export default validateSlug
