import cx from 'classnames'
import Image from 'next/image'
import type { ITwoColumnCta } from '@/payload-types'
import Button from '../Button'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TwoColumnCtaBlock.module.scss'

export type TwoColumnCtaProps = ITwoColumnCta & {
  className?: string
}

export default function TwoColumnCtaBlock({
  image,
  eyebrow,
  header,
  text,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  variation,
  className,
}: TwoColumnCtaProps) {
  return (
    <section className={cx(styles.twoColumnCta, { [styles[`twoColumnCta__${variation}`]]: variation }, className)}>
      <div className={styles.wrap}>
        {image && typeof image === 'object' && image.url && image.alt
          && (
            <div className={styles.imageWrap}>
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width ?? 0}
                height={image.width ?? 0}
                className={styles.image}
              />
            </div>
          )}
        {eyebrow
          && (
            <div className={cx(styles.eyebrow, styles.eyebrow__mobile)}>
              <p className={styles.eyebrow__mobile}>{eyebrow}</p>
            </div>
          )}
        <div className={styles.contentColumnWrap}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {header && <h2 className={styles.header}>{header}</h2>}
          <div className={styles.text}>
            {text && <LexicalRenderer content={text} />}
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
                buttonStyle='secondary'
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
