import Image from 'next/image'
import type { ITwoColumnCta } from '@/payload-types'
import Button from '../Button'
import LexicalRenderer from '../LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './TwoColumnCtaBlock.module.scss'

export default function TwoColumnCtaBlock({
  // image,
  eyebrow,
  header,
  text,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: ITwoColumnCta) {
  return (
    <section className={styles.twoColumnCta}>
      <div className={styles.wrap}>
        <div className={styles.imageWrap}>
          <Image
            src='/foo.png'
            alt='foo'
            width={32}
            height={32}
          />
        </div>
        <div className={styles.content}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {header && <h2 className={styles.headline}>{header}</h2>}
          <div className={styles.text}>
            {text && <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />}
          </div>
          <div className={styles.buttonsWrap}>
            {primaryButtonText && primaryButtonLink
            && (
              <Button
                link={primaryButtonLink}
                text={primaryButtonText}
              />
            )}
            {secondaryButtonText && secondaryButtonLink
            && (
              <Button
                link={secondaryButtonLink}
                text={secondaryButtonText}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
