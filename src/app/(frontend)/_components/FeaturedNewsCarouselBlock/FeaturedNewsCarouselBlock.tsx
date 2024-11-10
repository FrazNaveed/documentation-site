import cx from 'classnames'
import styles from './FeaturedNewsCarouselBlock.module.scss'

export default function FeaturedNewsCarouselBlock({ className }: any) {
  return (
    <section className={cx(styles.carouselWrap, className)}>
      Carousel
    </section>
  )
}
