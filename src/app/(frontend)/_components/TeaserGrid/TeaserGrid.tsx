import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import type {
  Media, News, NewsType,
} from '@/payload-types'
import ContentTypeIcon from '../ContentTypeIcon'
import PartnerLogos from '../PartnerLogos'
import Pill from '../Pill'
import convertToDate from '../../_utils/convertToDate'
import getCollectionPath from '../../_utils/getCollectionPath'
import styles from './TeaserGrid.module.scss'

export type TeaserGridProps = {
  gridStyle?: '3-up' | 'wide'
  teasers: News[]
}

export default function TeaserGrid({
  gridStyle = '3-up',
  teasers,
}: TeaserGridProps) {
  return (
    <div className={styles.container}>
      <div className={cx(styles.grid, styles[`grid__${gridStyle}`])}>
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
          const link = `${getCollectionPath('news')}/${slug}`
          const typeHeroBgImage = typeof type === 'object' ? type.image : undefined
          const subTypeHeroBgImage = subtype && typeof subtype === 'object' ? subtype.image : undefined
          const backgroundImage = subTypeHeroBgImage || typeHeroBgImage
          return (
            <article key={id} className={cx(styles.teaser, styles[`teaser__${gridStyle}`])}>
              <Link href={link} className={cx(styles.visualsWrap, styles[`visualsWrap__${gridStyle}`])} tabIndex={-1}>
                {typeof backgroundImage === 'object' && backgroundImage?.url && (
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
                      <div className={cx(styles.thumbnailWrap, styles[`thumbnailWrap__${gridStyle}`])}>
                        <Image
                          className={styles.thumbnail}
                          src={teaserThumbnail.url}
                          width={teaserThumbnail.width ?? 0}
                          height={teaserThumbnail.height ?? 0}
                          alt={teaserThumbnail.alt}
                          priority
                        />
                        <ContentTypeIcon className={styles.thumbnailIcon} contentType={contentType} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <header className={cx(styles.text, styles[`text__${gridStyle}`])}>
                {title && (
                  <h2 className={cx(styles.title, styles[`title__${gridStyle}`])}>
                    <Link href={link} className={styles.titleLink}>
                      {title}
                    </Link>
                  </h2>
                )}
                {gridStyle === 'wide' && excerpt && (
                  <p className={styles.excerpt}>
                    {excerpt}
                  </p>
                )}
                {(type || timestamp) && (
                  <div className={styles.meta}>
                    {type && <Pill text={(type as NewsType).title} size='small' />}
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
