import { flareWebsiteApiBase } from '@/src/environment'
import cx from 'classnames'
import type { IFastPanel } from 'payload-types'
import FastCounter from './FastCounter'
import styles from './FastPanel.module.scss'
import FastVideo from './FastBgVideo'

async function fetchData(): Promise<{abt: { avg_ms: number}, transactionCount: {count: number}}> {
  try {
    const [abt, transactionCount] = await Promise.all([
      fetch(`${flareWebsiteApiBase}webpage/avrage_block_time`).then((res) => res.json()),
      fetch(`${flareWebsiteApiBase}webpage/transaction_count`).then((res) => res.json()),
    ])
    return { abt, transactionCount }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching stats:', error)
    return { abt: { avg_ms: 1600 }, transactionCount: { count: 130137180 } }
  }
}

type FastPanelProps = IFastPanel & {
  className?: string
}

export default async function FastPanel({ text, className }: FastPanelProps) {
  const { abt, transactionCount } = await fetchData()
  return (
    <section className={cx(styles.wrap, className)}>
      <FastVideo videoSrc='/en/video/home_fast_desktop.webm' mobileVideoSrc='/en/video/home_fast_mobile.mp4' />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>Fast</h1>
          <FastCounter start={transactionCount.count} rate={abt.avg_ms} />
          <br />
          <p className={styles.text}>
            {abt.avg_ms / 1000}
            ms
            {text && ` ${text}`}
          </p>
        </div>
      </div>
    </section>
  )
}
