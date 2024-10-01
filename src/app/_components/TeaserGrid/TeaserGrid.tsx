import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import PartnerLogos from '../PartnerLogos'
import Pill from '../Pill'
import PlayButton from '../svgs/PlayButton'
import convertToDate from '../../utils/convertToDate'
import type { Media, News, NewsSubType, NewsType } from 'src/payload-types'
import type { TDateFormat } from '../../utils/convertToDate'
import styles from './TeaserGrid.module.scss'

export type TeaserGridProps = {
  style?: '3-up' | 'wide'
  teasers: News[]
}

export default function TeaserGrid({
  style = '3-up',
  teasers,
}: TeaserGridProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {teasers.map(({
          id,
          contentType,
          excerpt,
          logos,
          publishDate: timestamp,
          slug,
          subtype,
          type,
          teaserThumbnail,
          title,
        }) => {
          const link = `/news/${slug}`
          const { image: typeHeroBgImage } = type as NewsType
          const { image: subTypeHeroBgImage } = subtype as NewsSubType || {}
          const backgroundImage = subTypeHeroBgImage as Media || typeHeroBgImage as Media
          const thumbnailIcons = {
            'video': <PlayButton />,
            'podcast': null,
          }
          return (
            <article key={id} className={styles.teaser}>
              <Link href={link} className={styles.visualsWrap} tabIndex={-1}>
                {backgroundImage?.url && (
                  <div className={styles.bgImgWrap}>
                    <Image
                      className={styles.bgImg}
                      src={backgroundImage.url}
                      width={backgroundImage.width ?? 0}
                      height={backgroundImage.height ?? 0}
                      alt={backgroundImage.alt}
                      priority
                    />
                  </div>
                )}
                <div className={styles.visuals}>
                  <div className={styles.content}>
                    {logos && <PartnerLogos logos={logos.map(({ image }) => image as Media)} stacked />}
                  </div>
                  <div className={styles.decoration}>
                    {typeof teaserThumbnail === 'object' && teaserThumbnail?.url && (
                      <div className={cx(styles.thumbnailWrap, styles[`thumbnailWrap__${style}`])}>
                        <Image
                          className={styles.thumbnail}
                          src={teaserThumbnail.url}
                          width={teaserThumbnail.width ?? 0}
                          height={teaserThumbnail.height ?? 0}
                          alt={teaserThumbnail.alt}
                          priority
                        />
                        {contentType && <div className={styles.thumbnailIcon}>{thumbnailIcons[contentType]}</div>}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <header className={styles.text}>
                {title && (
                  <h2 className={styles.title}>
                    <Link href={link} className={styles.titleLink}>
                      {title}
                    </Link>
                  </h2>
                )}
                {(type || timestamp) && (
                  <div className={styles.meta}>
                    {type && <Pill text={(type as NewsType).name} size='small' />}
                    {timestamp && <time className={styles.date} dateTime={timestamp}>{convertToDate(timestamp)}</time>}
                  </div>
                )}
              </header>
            </article>
          )
        })}
      </div>
    </div>
  )
}
