import cx from 'classnames'
import type { TwoColumns } from '@/payload-types'
import Image from 'next/image'
import LexicalRenderer from '../LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './TwoColumnBlock.module.scss'

export default function TwoColumnBlock({
  layout,
  'Column 1': columnOne,
  'Column 2': columnTwo,
  id,
}: TwoColumns) {
  const columns = [columnOne, columnTwo]
  // console.log('array? ', columns)
  return (
    <section className={cx(styles.twoColumnBlock)}>
      {columns?.map((column, index) => {
        if (!column) return null

        const isImage = column && column.content?.contentType === 'image'
        const {
          content,
        } = column
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${id}-${index}`}
            className={cx(
              styles.column,
              styles[`column__${layout}`],
              !isImage && styles.columnText,
              isImage && styles.column__mobileImage,
            )}
          >
            {isImage && content && typeof content.image === 'object' && content.image?.url
              && (
              <div className={cx(
                styles.imageWrap,
              )}
              >
                {/* image alignment: {column.imageAlignment}
                image fill: {column.imageFill} */}
                <Image
                  src={content?.image.url}
                  alt={content?.image.alt}
                  layout='fill'
                  object-fit={column.imageFill || 'contain'}
                  object-position={column.imageAlignment || 'center'}
                  className={styles.image}
                />
                <Image
                  src={content?.image.url}
                  alt={content?.image.alt}
                  width={content?.image.width ?? 0}
                  height={content?.image.height ?? 0}
                  // layout='fill'
                  className={styles.showOnMobile}
                />
              </div>
              )}
            {column.content?.contentType === 'text'
              && <LexicalRenderer content={column.content?.text as PayloadLexicalReactRendererContent} />}
          </div>
        )
      })}
    </section>
  )
}
