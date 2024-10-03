import cx from 'classnames'
import styles from './StatsBlock.module.scss'
import { RichText } from '@/payload-types'

export type StatsProps = {
  stats: Array<{ label: string; stat: string }>
  caption: string // RichText
  className?: string
}

export default function Stats({ stats, caption, className }: StatsProps) {
  return (
    <section className={styles.statsBlock}>
      <div className={styles.statsBlockWrap}>
        <div className={styles.stats}>
          {stats?.map((stat, index) => (
            <div key={index} className={cx(styles.Stat)}>
              <h3 className={styles.StatLabel}>{stat.label}</h3>
              <p className={styles.StatNumber}>{stat.stat}</p>
            </div>
          ))}
        </div>
        <div className={styles.captionWrap}>
          <p className={styles.caption}>{caption}</p>
        </div>
      </div>
    </section>
  )
}
