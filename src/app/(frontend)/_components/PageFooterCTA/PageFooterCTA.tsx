import cx from 'classnames'
import Image from 'next/image'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string,
  buttonLink?: string
}

export default function PageFooterCTA({ className, buttonText, buttonLink }: PageFooterCTAProps) {
  return (
    <section className={cx(styles.Wrap, className)}>
      <div className={styles.content}>
        <div className={styles.ImageWrap}>
          <Image
            src='/en/vote_bg.png'
            width={276}
            height={276}
            alt='background image of two cylinders'
            className={styles.bgImg__left}
          />
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
          <Image
            src='/en/vote_bg.png'
            width={276}
            height={276}
            alt='background image of two cylinders'
            className={styles.bgImg__right}
          />
        </div>
        {/* <div className={styles.ImageWrapMobile}>
          <Image
            src='/en/vote_mobile_bg.png'
            width={106}
            height={106}
            alt='background image of two cylinders'
            className={styles.bgImg__mobile}
          />
        </div> */}
      </div>
    </section>
  )
}
