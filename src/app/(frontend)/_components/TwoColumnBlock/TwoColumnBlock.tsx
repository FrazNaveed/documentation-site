import cx from 'classnames'
import type { TwoColumns } from '@/payload-types'
import Image from 'next/image'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TwoColumnBlock.module.scss'

export type TwoColumnsProps = TwoColumns & {
  className?: string
}

export default function TwoColumnBlock({
  layout,
  ColumnOne: columnOne,
  ColumnTwo: columnTwo,
  id,
  className,
}: TwoColumnsProps) {
  const columns = [columnOne, columnTwo]
  return (
    <section className={cx(styles.twoColumnBlock, className)}>
      {columns?.map((column, index) => {
        if (!column) return null

        const isImage = column && column.contentType === 'image'
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${id}-${index}`}
            className={cx(
              styles.column,
              styles[`column__${layout}`],
              !isImage && styles.columnText,
              isImage && styles.columnImage,
              isImage && styles.column__mobileImage,
            )}
          >
            {isImage && column && typeof column.image === 'object' && column.image?.url
              && (
              <div className={cx(
                styles.imageWrap,
              )}
              >
                <Image
                  src={column.image.url}
                  alt={column.image.alt}
                  sizes='(max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 50vw'
                  style={{
                    objectFit: column.imageFill || 'contain',
                    objectPosition: column.imageAlignment || 'center',
                  }}
                  width={column.image.width ?? 0}
                  height={column.image.height ?? 0}
                  className={styles.image}
                />
                <Image
                  src={column.image.url}
                  alt={column.image.alt}
                  width={column.image.width ?? 0}
                  height={column.image.height ?? 0}
                  sizes='(max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 50vw'
                  style={{
                    objectFit: column.imageFill || 'contain',
                    objectPosition: column.imageAlignment || 'center',
                  }}
                  className={styles.showOnMobile}
                />
              </div>
              )}
            {column.contentType === 'text' && column.text
              && <LexicalRenderer content={column.text} />}
          </div>
        )
      })}
    </section>
  )
}
