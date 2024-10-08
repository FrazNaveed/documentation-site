import cx from 'classnames'
import type { Stats } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './StatsBlock.module.scss'

export type StatsProps = Stats & {
  className?: string
}

export default function StatsBlock({ stats, caption, className }: StatsProps) {
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
          {caption && <LexicalRenderer content={caption as PayloadLexicalReactRendererContent} />}
        </div>
      </div>
    </section>
  )
}
