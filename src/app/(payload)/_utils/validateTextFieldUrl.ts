const validateTextFieldUrl = (value: string | null | undefined) => {
  if (typeof value !== 'string') {
    return 'Invalid value type. Please enter a valid URL.';
  }

  const isValidRelativePath = value.startsWith('/')

  try {
    const url = new URL(value)
  
    if (!isValidRelativePath && !url.hostname.includes('.')) {
        return 'Please enter a valid URL with a valid domain.'
      }
    
    return true;
  } catch {
    return 'Please enter a valid URL. External link must include \'https://\'.';
  }
}

export default validateTextFieldUrl
