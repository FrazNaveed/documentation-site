import { flareWebsiteApiBase } from '@/src/environment'
import cx from 'classnames'
import type { IFastPanel } from 'payload-types'
import FastCounter from './FastCounter'
import styles from './FastPanel.module.scss'
import FastVideo from './FastBgVideo'

type BlockTimeResponse = {
  avg_ms?: number
}

type TransactionCountResponse = {
  count?: number
}

type APIData = {
  abt: BlockTimeResponse | null
  transactionCount: TransactionCountResponse | null
}

async function fetchWithErrorHandling<T>(url: string): Promise<T | null> {
  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json() as { error: string }
    throw new Error(`status ${res.status} - ${errorData?.error || 'No error message returned from API'}`)
  }

  return res.json()
}

async function fetchData(): Promise<APIData> {
  try {
    const [abt, transactionCount] = await Promise.all([
      fetchWithErrorHandling<BlockTimeResponse>(`${flareWebsiteApiBase}webpage/avrage_block_time`),
      fetchWithErrorHandling<TransactionCountResponse>(`${flareWebsiteApiBase}webpage/transaction_count`),
    ])
    return { abt, transactionCount }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching stats:', error)
    return { abt: { avg_ms: undefined }, transactionCount: { count: undefined } }
  }
}

type FastPanelProps = IFastPanel & {
  className?: string
}

export default async function FastPanel({ text, className }: FastPanelProps) {
  const { abt, transactionCount } = await fetchData()
  if (
    abt?.avg_ms === null || abt?.avg_ms === undefined
    || transactionCount?.count === null || transactionCount?.count === undefined
  ) {
    return null
  }
  const averageTimeInSeconds = (abt.avg_ms / 1000).toFixed(1)

  return (
    <section className={cx(styles.wrap, className)}>
      <FastVideo videoSrc='/en/video/home_fast_desktop' mobileVideoSrc='/en/video/home_fast_mobile' />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>Fast</h1>
          <FastCounter start={transactionCount.count} rate={abt.avg_ms} />
          <br />
          <p className={styles.text}>
            {averageTimeInSeconds}
            s
            {text && ` ${text}`}
          </p>
        </div>
      </div>
    </section>
  )
}
