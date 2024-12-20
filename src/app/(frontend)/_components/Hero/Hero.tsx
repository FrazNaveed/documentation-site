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
  heroStyle?: 'standard' | 'featuredNews'
  link?: string
  backgroundImage?: Media
  contentType?: News['contentType']
  logos?: Media[]
  thumbnail?: Media | null
  header?: string | null
  timestamp?: string | null
  dateFormat?: TDateFormat
  pill?: {
    text: string
    link?: string
  }
  noMinHeight?: boolean
}

export default function Hero({
  heroStyle = 'standard',
  link,
  backgroundImage,
  contentType,
  logos,
  thumbnail,
  header,
  timestamp,
  dateFormat,
  pill,
  noMinHeight = false,
}: HeroProps) {
  const innerMarkup = (
    <div
      className={cx(
        styles.grid,
        styles[`grid__${heroStyle}`],
        {
          [styles.bg]: heroStyle === 'featuredNews',
          [styles.container]: heroStyle !== 'featuredNews',
          [styles.grid__noMinHeight]: noMinHeight,
        },
      )}
    >
      <div className={cx(styles.decoration, styles[`decoration__${heroStyle}`])}>
        {backgroundImage?.url && (
          <div className={cx(styles.bgImgWrap, styles[`bgImgWrap__${heroStyle}`])}>
            <Image
              className={cx(styles.bgImg, styles[`bgImg__${heroStyle}`])}
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
      <div className={cx(styles.content, styles[`content__${heroStyle}`])}>
        {logos && <PartnerLogos logos={logos} stacked={heroStyle === 'standard'} />}
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
      </div>
    </div>
  )
  return (
    <div
      className={cx(
        {
          [styles.container]: heroStyle === 'featuredNews',
          [styles.bg]: heroStyle !== 'featuredNews',
          [styles.hideOnMobile]: heroStyle === 'standard' && (!logos || logos.length === 0), // If hero is standard style and no partner logo exists, do not display on mobile
        },
      )}
    >
      {link ? (
        <Link href={link}>
          {innerMarkup}
        </Link>
      ) : innerMarkup}
    </div>
  )
}
