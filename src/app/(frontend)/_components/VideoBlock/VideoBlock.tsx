'use client'

import dynamic from 'next/dynamic'
import styles from './VideoBlock.module.scss'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

export type VideoBlockProps = {
  title?: string
  url?: string
}

export default function VideoBlock({ title, url }: VideoBlockProps) {
  return (
    <section className={styles.videoBlockWrap}>
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
