'use client'

// VideoEmbed component is currently used
// keeping this component in case it's needed later
// See pull #66
import dynamic from 'next/dynamic'
import cx from 'classnames'
import styles from './VideoBlock.module.scss'
import applyBlockMarginStyles from '../../_utils/applyBlockMarginStyles'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

export type VideoBlockProps = {
  title?: string | null,
  url?: string | null,
  standardBottomMargin?: boolean | null,
  standardTopMargin?: boolean | null,
}

export default function VideoBlock({
  title, url, standardBottomMargin, standardTopMargin,
}: VideoBlockProps) {
  return (
    <section className={cx(styles.videoBlockWrap, applyBlockMarginStyles(standardTopMargin, standardBottomMargin))}>
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
