import cx from 'classnames'
import type { IFeaturedNewsCarouselBlock } from '@/payload-types'
import styles from './FeaturedNewsCarouselBlock.module.scss'

export type FeaturedNewsCarouselBlockProps = IFeaturedNewsCarouselBlock & {
  className?: string
}

export default function FeaturedNewsCarouselBlock({ className }: FeaturedNewsCarouselBlockProps) {
  return (
    <section className={cx(styles.carouselWrap, className)}>
      Carousel
    </section>
  )
}
