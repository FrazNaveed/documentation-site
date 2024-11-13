import { Media, News, NewsType } from '@/payload-types'
import Image from 'next/image'
import convertToDate from '@/src/app/(frontend)/_utils/convertToDate'
import ExternalLink from '../../../ExternalLink'
import PartnerLogos from '../../../PartnerLogos'
import Pill from '../../../Pill'
import styles from './Slide.module.scss'

export default function Slide({
  title, logos, slug, teaserThumbnail, publishDate: timestamp, type,
}: News) {
  return (
    <div className={styles.slideWrap}>
      <div className={styles.link}>
        <ExternalLink
          href={`/news/${slug}`}
        >
          Read more
        </ExternalLink>
      </div>
      <div className={styles.slide}>
        {typeof teaserThumbnail === 'object' && teaserThumbnail?.url && (
          <div className={styles.imageWrap}>
            <Image
              src={teaserThumbnail.url}
              alt={teaserThumbnail.alt}
              width={teaserThumbnail.width ?? 0}
              height={teaserThumbnail.height ?? 0}
            />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.eyebrow}>Flare Featured News</h2>
          <div className={styles.logos}>
            {logos && <PartnerLogos logos={logos.map(({ image }) => image as Media)} />}
          </div>
          <h3 className={styles.title}>
            {title}
          </h3>
          {(type || timestamp) && (
            <div className={styles.meta}>
              {type && <Pill text={(type as NewsType).title} size='small' />}
              {timestamp && <time className={styles.date} dateTime={timestamp}>{convertToDate(timestamp)}</time>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
