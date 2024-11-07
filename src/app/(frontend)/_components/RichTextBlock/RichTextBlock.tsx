import cx from 'classnames'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import type { RichText as IRichText, RichTextBlock as IRichTextBlock } from 'payload-types'
import styles from './RichTextBlock.module.scss'
import applyBlockMarginStyles from '../../_utils/applyBlockMarginStyles'

type RichTextBlockProps = {
  richText: IRichText['richText'],
  standardTopMargin?: IRichTextBlock['standardTopMargin']
  standardBottomMargin?: IRichTextBlock['standardBottomMargin']
}

export default function RichTextBlock({ richText, standardBottomMargin, standardTopMargin }: RichTextBlockProps) {
  if (!richText) {
    return null
  }
  return (
    <div className={cx(styles.wrap, applyBlockMarginStyles(standardTopMargin, standardBottomMargin))}>
      <div className={styles.cols}>
        <LexicalRenderer content={richText as PayloadLexicalReactRendererContent} />
      </div>
    </div>
  )
}
