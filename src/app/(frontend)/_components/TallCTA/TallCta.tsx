import Image from 'next/image'
import { i18n } from '@/src/app/i18n-config'
import Button from '../Button'
import styles from './TallCta.module.scss'

export interface TallCtaProps {
  title: string,
  content: string,
  buttonText: string,
  buttonLink: string,
  option?: boolean
}

export default function TallCta({
  title, content, buttonText, buttonLink, option,
}: TallCtaProps) {
  return (
    <section className={styles.tallCta}>
      <div className={styles.tallCtaWrap}>
        <div className={styles.tallCtaImageWrap}>
          <Image
            src={`/${i18n.defaultLocale}/bug.png`}
            alt='Image of a bug for the Bug Bounty program'
            width={592}
            height={592}
            className={styles.tallCtaImage}
          />
          {option && (
            <Image
              src={`/${i18n.defaultLocale}/bug.png`}
              alt='Image of a smaller bug for the Bug Bounty program'
              width={230}
              height={230}
              className={styles.tallCtaOptionalImage}
            />
          )}
        </div>
        <div className={styles.tallCtaText}>
          {title && <h2 className={styles.tallCtaTitle}>{title}</h2>}
          {content && <p className={styles.tallCtaContent}>{content}</p>}
          {buttonText && buttonLink && (
            <Button
              text={buttonText}
              link={buttonLink}
            />
          )}
        </div>
      </div>
    </section>
  )
}
