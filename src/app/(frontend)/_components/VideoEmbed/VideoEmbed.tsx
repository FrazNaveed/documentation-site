'use client'

import dynamic from 'next/dynamic'

import styles from './VideoEmbed.module.scss'

// Dependency relies on window. This fixes a hydration error
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

interface VideoEmbedProps {
  url: string
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  return (
    <div className={styles.videoWrap}>
      <ReactPlayer
        url={url}
        className={styles.videoPlayer}
        width='100%'
        height='100%'
        controls
      />
    </div>
  )
}
