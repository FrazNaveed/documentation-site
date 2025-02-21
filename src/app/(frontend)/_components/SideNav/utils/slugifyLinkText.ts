import slugify from 'slugify'

const slugifyLinkText = (anchorText: string): string => {
  const linkId = slugify(anchorText, { lower: true, strict: true })
  return linkId
}

export default slugifyLinkText
