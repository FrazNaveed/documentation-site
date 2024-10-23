import { News } from '@/payload-types'
import Link from 'next/link'
import RightArrow from '../svgs/RightArrow'
import TeaserGrid from '../TeaserGrid'
import styles from './RelatedPosts.module.scss'

export type RelatedPostsProps = {
  header?: string | 'Related News'
  linkText?: string | undefined
  linkUrl?: string | undefined
  posts: News[]
}

export default function RelatedPosts({
  header = 'Related News',
  posts,
  linkText,
  linkUrl,
}: RelatedPostsProps) {
  return (
    <div className={styles.relatedNews}>
      <div className={styles.relatedNewsHeaderWrap}>
        <h5 className={styles.relatedNewsHeader}>{header}</h5>
        {linkText && linkUrl && (
          <Link
            href={linkUrl}
          >
            <span className={styles.relatedNewsLink}>
              {linkText}
              <RightArrow className={styles.arrowRight} />
            </span>
          </Link>
        )}
      </div>
      <TeaserGrid teasers={posts} />
    </div>
  )
}
