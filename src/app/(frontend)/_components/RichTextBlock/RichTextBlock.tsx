import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import type { RichText as IRichText } from 'payload-types'
import styles from './RichTextBlock.module.scss'

type RichTextBlockProps = {
  richText: IRichText['richText']
}

export default function RichTextBlock({ richText }: RichTextBlockProps) {
  if (!richText) {
    return null
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.cols}>
        <LexicalRenderer content={richText as PayloadLexicalReactRendererContent} />
      </div>
    </div>
  )
}
