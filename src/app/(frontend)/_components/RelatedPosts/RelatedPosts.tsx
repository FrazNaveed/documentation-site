import cx from 'classnames'
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
  className?: string
}

export default function RelatedPosts({
  header = 'Related News',
  posts,
  linkText,
  linkUrl,
  className,
}: RelatedPostsProps) {
  return (
    <div className={cx(styles.relatedNews, className)}>
      <div className={styles.relatedNewsHeaderWrap}>
        <h5 className={styles.relatedNewsHeader}>{header}</h5>
        {linkText && linkUrl && (
          <Link
            href={linkUrl}
            aria-label={`${linkText.toLowerCase()}`}
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
