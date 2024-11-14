import { Media, News, NewsType } from '@/payload-types'
import Image from 'next/image'
import convertToDate from '@/src/app/(frontend)/_utils/convertToDate'
import getCollectionPath from '@/src/app/(frontend)/_utils/getCollectionPath'
import Link from 'next/link'
import PartnerLogos from '../../../PartnerLogos'
import Pill from '../../../Pill'
import RightArrow from '../../../svgs/RightArrow'
import styles from './Slide.module.scss'

export default function Slide({
  title, logos, slug, publishDate: timestamp, type, subtype,
}: News) {
  const typeHeroBgImage = typeof type === 'object' ? type.image : undefined
  const subTypeHeroBgImage = subtype && typeof subtype === 'object' ? subtype.image : undefined
  const backgroundImage = subTypeHeroBgImage || typeHeroBgImage
  return (
    <div className={styles.slideWrap}>
      <div className={styles.linkWrap}>
        <Link
          href={`${getCollectionPath('news')}${slug}`}
          aria-label={`Read more about ${title}`}
          className={styles.link}
        >
          Read more
          <RightArrow className={styles.link_Icon} />
        </Link>
      </div>
      <div className={styles.slide}>
        <div className={styles.imageWrap}>
          {typeof backgroundImage === 'object' && backgroundImage?.url && (
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt}
              width={backgroundImage.width ?? 0}
              height={backgroundImage.height ?? 0}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.eyebrow}>Flare Featured News</div>
          <div className={styles.logos}>
            {logos && <PartnerLogos logos={logos.map(({ image }) => image as Media)} />}
          </div>
          <h2 className={styles.title}>
            {title}
          </h2>
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
