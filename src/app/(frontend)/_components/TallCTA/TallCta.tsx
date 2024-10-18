import Image from 'next/image'
import { i18n } from '@/src/app/i18n-config'
import Button from '../Button'
import styles from './TallCta.module.scss'

export default function TallCta({
  title, content, buttonText, buttonLink, option,
}: any) {
  return (
    <section className={styles.tallCta}>
      <div className={styles.tallCtaWrap}>
        <div className={styles.tallCtaImageWrap}>
          <Image
            src={`/${i18n.defaultLocale}/bug.png`}
            alt='bg image'
            width={592}
            height={592}
            className={styles.tallCtaImage}
          />
          {option && (
            <Image
              src={`/${i18n.defaultLocale}/bug.png`}
              alt='bg image'
              width={230}
              height={230}
              className={styles.tallCtaOptionalImage}
            />
          )}
        </div>
        <div className={styles.tallCtaContent}>
          <h2>{title}</h2>
          <p>{content}</p>
          <Button
            text={buttonText}
            link={buttonLink}
          />
        </div>
      </div>
    </section>
  )
}
