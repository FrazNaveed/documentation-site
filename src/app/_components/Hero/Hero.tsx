import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import PartnerLogos from '../PartnerLogos'
import Pill from '../Pill'
import convertToDate from '../../utils/convertToDate'
import type { Media } from 'src/payload-types'
import type { TDateFormat } from '../../utils/convertToDate'
import styles from './Hero.module.scss'

export type HeroProps = {
  style?: 'standard' | 'featuredNews' | 'featuredEvent' | 'protocol'
  link?: string
  backgroundImage?: Media
  logos?: Media[]
  thumbnailImage?: Media
  header?: string | null
  subheader?: string | null
  timestamp?: string | null
  dateFormat?: TDateFormat
  eyebrow?: string | null
  pill?: {
    text: string
    link?: string
  }
  cta?: {
    text: string
    link: string
  }
}

export default function Hero({
  style = 'standard',
  link,
  backgroundImage,
  logos,
  thumbnailImage,
  header,
  subheader,
  timestamp,
  dateFormat,
  eyebrow,
  pill,
  cta,
}: HeroProps) {
  const innerMarkup = (
    <>
      <div className={cx(styles.decoration, styles[`decoration__${style}`])}>
        {backgroundImage?.url && (
          <div className={cx(styles.bgImgWrap, styles[`bgImgWrap__${style}`])}>
            <img
               className={cx(styles.bgImg, styles[`bgImg__${style}`])}
              src={backgroundImage.url}
            />
          </div>
        )}
      </div>
      <header className={cx(styles.content, styles[`content__${style}`])}>
        {logos && <PartnerLogos logos={logos} />}
        {header && <h2 className={styles.header}>{header}</h2>}
        {(pill || timestamp) && (
          <div className={styles.meta}>
            {pill && <Pill text={pill.text} link={pill.link} />}
            {timestamp && <time className={styles.date} dateTime={timestamp}>{convertToDate(timestamp, dateFormat)}</time>}
          </div>
        )}
      </header>
    </>
  )
  return (
    <article className={styles.container}>
      {link ? (
        <Link href={link} className={styles.wrap}>
          {innerMarkup}
        </Link>
      ) : (
        <div className={styles.wrap}>
          {innerMarkup}
        </div>
      )}
    </article>
  )
}
