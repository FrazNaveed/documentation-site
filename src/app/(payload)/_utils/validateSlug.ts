const validateSlug = (value: string | null | undefined) => {
  if (value?.startsWith('/') || value?.endsWith('/')) {
    return 'Slug must not contain leading or trailing slashes'
  }

  return true
}

export default validateSlug
