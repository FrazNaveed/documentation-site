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
      <TeaserGrid teasers={posts} />
    </div>
  )
}
