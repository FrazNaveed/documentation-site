import { News } from '@/payload-types'
import styles from './RelatedPosts.module.scss'
import TeaserGrid from '../TeaserGrid'

export type RelatedPostsProps = {
  posts: News[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className={styles.relatedNews}>
      <h5 className={styles.relatedNewsHeader}>Related News</h5>
      {/* BUG: Depth doesn't seem to fetch any curated posts featured thumbnails, filing separate issue */}
      <TeaserGrid teasers={posts} />
    </div>
  )
}
