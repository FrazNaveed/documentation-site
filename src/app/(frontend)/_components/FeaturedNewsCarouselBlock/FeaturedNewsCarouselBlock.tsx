import cx from 'classnames'
import type { IFeaturedNewsCarouselBlock } from '@/payload-types'
import Slide from './components/Slide'
import styles from './FeaturedNewsCarouselBlock.module.scss'

export type FeaturedNewsCarouselBlockProps = IFeaturedNewsCarouselBlock & {
  className?: string
}

export default function FeaturedNewsCarouselBlock({ newsPosts, className }: FeaturedNewsCarouselBlockProps) {
  return (
    <section className={cx(styles.carouselWrap, className)}>
      {newsPosts?.map((newsPost: any) => {
        const {
          id,
          title,
          slug,
          publishDate,
          author,
          type,
          updatedAt,
          createdAt,
        } = newsPost
        return (
          <div key={id}>
            <Slide
              id={id}
              title={title}
              slug={slug}
              publishDate={publishDate}
              author={author}
              type={type}
              updatedAt={updatedAt}
              createdAt={createdAt}
            />
          </div>
        )
      })}
    </section>
  )
}
