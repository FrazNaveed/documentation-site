import cx from 'classnames'
import Image from 'next/image'
import Button from 'src/app/(frontend)/_components/Button'
import { i18n } from '@/src/app/i18n-config'
import styles from './SubscriptionBannerCTA.module.scss'

export type CTAProps = {
  header?: string
  text?: string
  buttonText?: string
  className?: string
}

export default function SubscriptionBannerCTA({
  header = 'Subscribe to the Flare Newsletter',
  text = 'Join over 30,000 Flare community members. Sign up to the Flare newsletter today to hear the latest on product releases, ecosystem announcements and global events.',
  buttonText = 'Subscribe',
  className,
}: CTAProps) {
  const url = `/${i18n.defaultLocale}/fw5_join_bg.png`
  const alt = 'background image'
  const imageWidth = 1728 / 2
  const imageHeight = 858 / 2

  return (
    <section className={cx(styles.subscriptionBanner, className)}>
      <div className={styles.container}>
        <div className={styles.contentWrap}>
          <h2 className={styles.header}>{header}</h2>
          <p className={styles.text}>{text}</p>
          <Button
            text={buttonText}
            size='medium'
            link='/sign-up'
          />
        </div>
        <div className={styles.imageWrap}>
          <Image
            className={styles.img}
            src={url}
            width={imageWidth}
            height={imageHeight}
            alt={alt}
          />
        </div>
      </div>
    </section>
  )
}
