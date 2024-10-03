import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import type { News, Media } from '@/payload-types'
import ContentTypeIcon from '../ContentTypeIcon'
import PartnerLogos from '../PartnerLogos'
import Pill from '../Pill'
import convertToDate from '../../_utils/convertToDate'
import type { TDateFormat } from '../../_utils/convertToDate'
import styles from './Hero.module.scss'

export type HeroProps = {
  style?: 'standard' | 'featuredNews' | 'featuredEvent' | 'protocol'
  link?: string
  backgroundImage?: Media
  contentType?: News['contentType']
  logos?: Media[]
  thumbnail?: Media | null
  header?: string | null
  // subheader?: string | null
  timestamp?: string | null
  dateFormat?: TDateFormat
  // eyebrow?: string | null
  pill?: {
    text: string
    link?: string
  }
  // cta?: {
  //   text: string
  //   link: string
  // }
}

export default function Hero({
  style = 'standard',
  link,
  backgroundImage,
  contentType,
  logos,
  thumbnail,
  header,
  // subheader,
  timestamp,
  dateFormat,
  // eyebrow,
  pill,
  // cta,
}: HeroProps) {
  const innerMarkup = (
    <div
      className={cx(
        styles.grid,
        styles[`grid__${style}`],
        {
          [styles.bg]: style === 'featuredNews',
          [styles.container]: style !== 'featuredNews',
        },
      )}
    >
      <div className={cx(styles.decoration, styles[`decoration__${style}`])}>
        {backgroundImage?.url && (
          <div className={cx(styles.bgImgWrap, styles[`bgImgWrap__${style}`])}>
            <Image
              className={cx(styles.bgImg, styles[`bgImg__${style}`])}
              src={backgroundImage.url}
              width={backgroundImage.width ?? 0}
              height={backgroundImage.height ?? 0}
              alt={backgroundImage.alt}
              priority
            />
          </div>
        )}
        {thumbnail?.url && (
          <div className={styles.thumbnailWrap}>
            <Image
              className={styles.thumbnail}
              src={thumbnail.url}
              width={thumbnail.width ?? 0}
              height={thumbnail.height ?? 0}
              alt={thumbnail.alt}
              priority
            />
            <ContentTypeIcon className={styles.thumbnailIcon} contentType={contentType} />
          </div>
        )}
      </div>
      <header className={cx(styles.content, styles[`content__${style}`])}>
        {logos && <PartnerLogos logos={logos} stacked={style === 'standard'} />}
        {header && <h2 className={styles.header}>{header}</h2>}
        {(pill || timestamp) && (
          <div className={styles.meta}>
            {pill && <Pill text={pill.text} link={pill.link} />}
            {timestamp && (
              <time className={styles.date} dateTime={timestamp}>
                {convertToDate(timestamp, dateFormat)}
              </time>
            )}
          </div>
        )}
      </header>
    </div>
  )
  return (
    <article
      className={cx(
        {
          [styles.container]: style === 'featuredNews',
          [styles.bg]: style !== 'featuredNews',
          [styles.hideOnMobile]: style === 'standard' && (!logos || logos.length === 0), // If hero is standard style and no partner/event logo exists, do not display on mobile
        },
      )}
    >
      {link ? (
        <Link href={link}>
          {innerMarkup}
        </Link>
      ) : innerMarkup}
    </article>
  )
}
