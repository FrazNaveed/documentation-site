import { baseUrl } from 'src/environment'

const isUrlExternal = (url?: string | null): boolean => {
  if (!url) {
    return false
  }
  if (url.startsWith(baseUrl)) {
    return false
  }
  if (url.startsWith('/')) {
    return false
  }
  if (url.startsWith('mailto:')) {
    return false
  }
  return true
}

export default isUrlExternal
