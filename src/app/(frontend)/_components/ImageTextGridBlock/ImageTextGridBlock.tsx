import Image from 'next/image'
import type { ImageTextCards } from '@/payload-types'
import LexicalRenderer from '../LexicalRenderer'
import styles from './ImageTextGridBlock.module.scss'
import { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'

export type ImageTextGridBlockProps = {
  imageTextGridTitle?: string | null
  imageTextCardGrid?: ImageTextCards | []
}

export default function ImageTextGridBlock({ imageTextGridTitle, imageTextCardGrid }: ImageTextGridBlockProps) {
  return (
    <section className={styles.imageTextGridBlock}>
      <div className={styles.headerWrap}>
        <h2>{imageTextGridTitle}</h2>
      </div>
      <div className={styles.imageTextGridWrap}>
        <ul className={styles.imageTextGrid}>
          {imageTextCardGrid?.map((card) => {
            const {
              cardHeader, cardImage, cardText, id,
            } = card
            return (
              <li key={id} className={styles.imageTextGridCard}>
                {cardImage && typeof cardImage === 'object' && cardImage.url && cardImage.alt && (
                  <div className={styles.imageWrap}>
                    <Image
                      src={cardImage.url}
                      alt={cardImage.alt}
                      width={340}
                      height={254}
                    />
                  </div>
                )}
                <h3 className={styles.imageTextGridCardHeader}>{cardHeader}</h3>
                {cardText && <LexicalRenderer content={cardText as PayloadLexicalReactRendererContent} />}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
