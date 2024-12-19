// Using any as we're only checking the structure
export default function isLexicalEmpty(content: any): boolean {
  return (
    content?.root?.children?.[0]?.type === 'paragraph'
      && content?.root?.children?.[0]?.children?.length === 0
      && content?.root?.children?.length === 1
  )
}
