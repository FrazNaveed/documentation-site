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
        pagination={{ clickable: true }}
        slidesPerView={1}
        className={styles.carouselWrap}
      >
        {newsPosts?.filter((newsPost): newsPost is News => typeof newsPost !== 'number').map((newsPost) => {
          const {
            id,
            logos,
            title,
            slug,
            excerpt,
            publishDate,
            author,
            type,
            subtype,
            updatedAt,
            createdAt,
          } = newsPost
          return (
            <SwiperSlide key={id}>
              <Slide
                id={id}
                logos={logos}
                title={title}
                slug={slug}
                excerpt={excerpt}
                publishDate={publishDate}
                author={author}
                type={type}
                subtype={subtype}
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
