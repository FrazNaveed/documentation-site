import { News } from '@/payload-types'
import Image from 'next/image'
import styles from './Slide.module.scss'

export default function Slide({
  title, slug, teaserThumbnail, publishDate,
}: News) {
  return (
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
        {title}
        {slug}
        {publishDate}
      </div>
    </div>
  )
}
