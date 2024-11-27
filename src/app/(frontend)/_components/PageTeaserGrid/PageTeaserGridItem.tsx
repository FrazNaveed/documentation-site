import Image from 'next/image'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import RightArrow from '../svgs/RightArrow'
import styles from './PageTeaserGrid.module.scss'

export default function PageTeaserGridItem({
  slug, id, title, pageTeaser = {},
}: Page) {
  const { icon, titleOverride, shortDescription } = pageTeaser
  return (
    <Link href={`/${slug}`} key={id} className={styles.teaserWrap}>
      <div className={styles.teaser}>
        <div className={styles.teaser_IconWrap}>
          {icon && typeof icon === 'object' && icon?.url && icon?.alt && (
            <Image
              className={styles.teaser_Icon}
              src={icon.url}
              alt={icon.alt}
              width={icon.width ?? 0}
              height={icon.height ?? 0}
            />
          )}
        </div>
        <div className={styles.teaser_TitleWrap}>
          <h3 className={styles.teaser_Title}>{titleOverride || title}</h3>
          <RightArrow className={styles.teaser_Arrow} />
        </div>
        {shortDescription && <p className={styles.teaser_Description}>{shortDescription}</p>}
      </div>
    </Link>

  )
}
