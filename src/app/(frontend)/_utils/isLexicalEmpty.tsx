import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface SerializedParagraphNode extends SerializedLexicalNode {
  type: 'paragraph';
  children: SerializedLexicalNode[]
}

type TContent = SerializedEditorState | null | undefined

// If content had been entered and deleted,
// Lexical field will no longer be null, but rather a root element with an empty paragraph child
// Check for this so to determine if there is Lexical content or not
export default function isLexicalEmpty(content: TContent): boolean {
  if (!content) {
    return true
  }
  const contentRootChildren = content?.root?.children
  return (
    contentRootChildren?.length === 1
      && contentRootChildren?.[0]?.type === 'paragraph'
      && (contentRootChildren?.[0] as SerializedParagraphNode)?.children.length === 0
  )
}
