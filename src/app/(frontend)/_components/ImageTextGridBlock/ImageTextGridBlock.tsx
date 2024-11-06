import cx from 'classnames'
import Image from 'next/image'
import type { ImageTextCards } from '@/payload-types'
import LexicalRenderer from '../LexicalRenderer'
import styles from './ImageTextGridBlock.module.scss'
import { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import inlineBlockMarginStyles from '../../_utils/inlineBlockMarginStyles'

export type ImageTextGridBlockProps = {
  imageTextGridTitle?: string | null
  imageTextCardGrid?: ImageTextCards | []
  standardTopMargin?: boolean | null| undefined,
  standardBottomMargin?: boolean | null | undefined,
}

export default function ImageTextGridBlock({
  imageTextGridTitle, imageTextCardGrid, standardTopMargin, standardBottomMargin,
}: ImageTextGridBlockProps) {
  return (
    <section className={cx(
      styles.imageTextGridBlock,
      inlineBlockMarginStyles(standardTopMargin, standardBottomMargin),
    )}
    >
      {imageTextGridTitle && <h2 className={styles.imageTextGridTitle}>{imageTextGridTitle}</h2>}
      <div className={styles.imageTextGridWrap}>
        <ul className={styles.imageTextGrid}>
          {imageTextCardGrid?.map((card) => {
            const {
              cardHeader, cardImage, cardText, id,
            } = card
            const hasContent = id && (cardHeader || cardImage || cardText)
            return (
              hasContent
              && (
              <li key={id} className={styles.imageTextGridCard}>
                {cardImage && typeof cardImage === 'object' && cardImage.url && cardImage.alt && (
                <div className={styles.imageWrap}>
                  <Image
                    src={cardImage.url}
                    alt={cardImage.alt}
                    width={cardImage.width ?? 0}
                    height={cardImage.height ?? 0}
                  />
                </div>
                )}
                {cardHeader && <h3 className={styles.imageTextGridCardHeader}>{cardHeader}</h3>}
                {cardText && <LexicalRenderer content={cardText as PayloadLexicalReactRendererContent} />}
              </li>
              )
            )
          })}
        </ul>
      </div>
    </section>
  )
}
