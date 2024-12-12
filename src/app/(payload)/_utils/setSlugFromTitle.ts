import type { FieldHook } from 'payload'
import slugify from 'slugify'

const setSlugFromTitle: FieldHook = ({ data, originalDoc }) => {
  if (data?.slug) {
    return
  }

  if (data?.title) {
    return slugify(data.title, { lower: true, strict: true, })
  }

  return originalDoc?.slug || ''
}

export default setSlugFromTitle
