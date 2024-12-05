import cx from 'classnames'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { RichText as IRichText } from 'payload-types'
import styles from './RichTextBlock.module.scss'

type RichTextBlockProps = {
  richText: IRichText['richText'],
  className?: string,
}

export default function RichTextBlock({ richText, className }: RichTextBlockProps) {
  if (!richText) {
    return null
  }
  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.cols}>
        <LexicalRenderer content={richText} />
      </div>
    </div>
  )
}
