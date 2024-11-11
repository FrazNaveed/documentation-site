'use client'

import cx from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import type { IFeaturedNewsCarouselBlock } from '@/payload-types'
import Slide from './components/Slide'
import styles from './FeaturedNewsCarouselBlock.module.scss'

export type FeaturedNewsCarouselBlockProps = IFeaturedNewsCarouselBlock & {
  className?: string
}

export default function FeaturedNewsCarouselBlock({ newsPosts, className }: FeaturedNewsCarouselBlockProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      className={cx(styles.carouselWrap, className)}
    >
      {newsPosts?.map((newsPost: any) => {
        const {
          id,
          teaserThumbnail,
          title,
          slug,
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
              title={title}
              slug={slug}
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
  )
}
