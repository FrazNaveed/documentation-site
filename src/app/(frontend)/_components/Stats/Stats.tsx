import cx from 'classnames'
import styles from './StatsBlock.module.scss'

export type StatsProps = {
  stats: Array<{ label: string; stat: string; id: string }>
  caption: string // RichText
  className?: string
}

export default function Stats({ stats, caption, className }: StatsProps) {
  return (
    <section className={cx(styles.statsBlock, className)}>
      <div className={styles.statsBlockWrap}>
        <div className={styles.stats}>
          {stats?.map((stat) => (
            <div key={stat.id} className={cx(styles.Stat)}>
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
