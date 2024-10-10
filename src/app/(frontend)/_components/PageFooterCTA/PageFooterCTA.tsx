import cx from 'classnames'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string,
  buttonLink?: string
  backgroundImage?: (number | null) | Media
  backgroundImageStyle: ('flipped' | 'offset') | null
}

export default function PageFooterCTA({
  className,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundImageStyle,
}: PageFooterCTAProps) {
  return (
    <section className={cx(styles.Wrap, className)}>
      <div className={styles.content}>
        <div className={styles.ImageWrap}>
          {backgroundImage && typeof backgroundImage === 'object' && typeof backgroundImage.url === 'string' && (
            <Image
              src={backgroundImage.url}
              width={276}
              height={276}
              alt={backgroundImage.alt}
              className={cx(
                styles.bgImg__left,
                styles[`bgImg__${backgroundImageStyle}`],
              )}
            />
          )}
        </div>
        {buttonText && buttonLink
          && (
            <Button
              text={buttonText}
              link={buttonLink}
              size='large'
              className={styles.Button}
            />
          )}
        <div className={styles.ImageWrap}>
          {backgroundImage && typeof backgroundImage === 'object' && typeof backgroundImage.url === 'string' && (
            <Image
              src={backgroundImage.url}
              width={276}
              height={276}
              alt={backgroundImage.alt}
              className={cx(
                styles.bgImg__right,
                styles[`bgImg__${backgroundImageStyle}`],
              )}
            />
          )}
        </div>
      </div>
    </section>
  )
}
