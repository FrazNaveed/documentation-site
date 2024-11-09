'use client'

import dynamic from 'next/dynamic'
import cx from 'classnames'
import styles from './VideoBlock.module.scss'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

export type VideoBlockProps = {
  title?: string | null,
  url?: string | null,
  className?: string
}

export default function VideoBlock({
  title, url, className,
}: VideoBlockProps) {
  return (
    <section className={cx(styles.videoBlockWrap, className)}>
      {title && <h2 className={styles.videoBlockTitle}>{title}</h2>}
      {url && (
        <div className={styles.videoPlayerWrap}>
          <ReactPlayer
            url={url}
            className={styles.videoPlayer}
            width='100%'
            height='100%'
            controls
          />
        </div>
      )}
    </section>
  )
}
