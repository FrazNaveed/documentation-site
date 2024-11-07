import Image from 'next/image'
import cx from 'classnames'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import type { Columns as TColumns } from 'payload-types'
import styles from './Columns.module.scss'

export default function Columns({
  layout,
  alignColumns,
  leftColumnBlock: leftColumn,
  rightColumnBlock: rightColumn,
  // createSideNavLink,
  // linkText,
}: TColumns) {
  const blockMarkup = (column: TColumns['leftColumnBlock'] | TColumns['rightColumnBlock']) => {
    if (column && column.length > 0) {
      const block = column[0]
      switch (block.blockType) {
        case 'colImage': {
          const { image } = block
          if (image && typeof image === 'object' && image.url) {
            return (
              <Image
                className={styles.image}
                src={image.url}
                width={image.width ?? 0}
                height={image.height ?? 0}
                alt={image.alt}
              />
            )
          }
          break
        }

        case 'richText':
          return block.richText && <LexicalRenderer content={block.richText as PayloadLexicalReactRendererContent} />

        default:
          return null
      }
    }
    return null
  }
  return (
    <div className={cx(styles.columns, alignColumns && styles.columns__topAligned)}>
      <div className={cx(styles.colLeft, styles[`colLeft__${layout}`])}>
        {blockMarkup(leftColumn)}
      </div>
      <div className={cx(styles.colRight, styles[`colRight__${layout}`])}>
        {blockMarkup(rightColumn)}
      </div>
    </div>
  )
}
