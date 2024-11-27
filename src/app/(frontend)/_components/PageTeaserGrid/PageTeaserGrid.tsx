import type { IPageTeaserGrid } from '@/payload-types'
import PageTeaserGridItem from './PageTeaserGridItem'
import styles from './PageTeaserGrid.module.scss'

export type PageTeaserGridProps = IPageTeaserGrid & {
  className?: string
}

export default function PageTeaserGrid({ title, teasers }: PageTeaserGridProps) {
  return (
    <section className={styles.teaserGrid}>
      {title && <h2 className={styles.teaserGrid_Title}>{title}</h2>}
      <div className={styles.teaserGrid_Wrap}>
        {teasers?.map((teaser) => (
          typeof teaser === 'object'
            ? <PageTeaserGridItem {...teaser} />
            : null
        ))}
      </div>
    </section>
  )
}
