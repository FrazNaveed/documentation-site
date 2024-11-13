'use client'

import cx from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import type { IFeaturedNewsCarouselBlock, News } from '@/payload-types'
import Slide from './components/Slide'
import styles from './FeaturedNewsCarouselBlock.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export type FeaturedNewsCarouselBlockProps = IFeaturedNewsCarouselBlock & {
  className?: string
}

export default function FeaturedNewsCarouselBlock({ newsPosts, className }: FeaturedNewsCarouselBlockProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        pagination
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className={styles.carouselWrap}
      >
        {newsPosts?.filter((newsPost): newsPost is News => typeof newsPost !== 'number').map((newsPost) => {
          const {
            id,
            teaserThumbnail,
            logos,
            title,
            slug,
            excerpt,
            publishDate,
            author,
            type,
            updatedAt,
            createdAt,
          } = newsPost
          return (
            <SwiperSlide key={id}>
              <Slide
                id={id}
                teaserThumbnail={teaserThumbnail}
                logos={logos}
                title={title}
                slug={slug}
                excerpt={excerpt}
                publishDate={publishDate}
                author={author}
                type={type}
                updatedAt={updatedAt}
                createdAt={createdAt}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
