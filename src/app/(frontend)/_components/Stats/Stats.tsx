import cx from 'classnames'
import type { Stats } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './StatsBlock.module.scss'

export type StatsProps = Stats & {
  className?: string
}

const bipsToPct = (bips: number | undefined): string => {
  if (bips === undefined) return 'N/A'
  return `${(bips / 100).toFixed(2)}%`
}

async function fetchStats() {
  try {
    const [fdApr, delegationApr, stakingApr] = await Promise.all([
      fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/delegation_apr').then((res) => res.json()),
      fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/delegation_apr').then((res) => res.json()),
      fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/staking_apr').then((res) => res.json()),
    ])
    return [
      { label: 'FlareDrop APR*', stat: bipsToPct(fdApr?.apr_bips), id: 'stat1' },
      { label: 'FlareDrop + Delegation APR*', stat: bipsToPct(delegationApr?.apr_bips), id: 'stat2' },
      { label: 'FlareDrop + Staking APR*', stat: bipsToPct(stakingApr?.apr_bips), id: 'stat3' },
    ]
  } catch (error) {
    // console.error('Error fetching stats:', error)
    return [
      { label: 'FlareDrop APR*', stat: 'N/A', id: 'stat1' },
      { label: 'FlareDrop + Delegation APR*', stat: 'N/A', id: 'stat2' },
      { label: 'FlareDrop + Staking APR*', stat: 'N/A', id: 'stat3' },
    ]
  }
}

export default async function StatsBlock({
  pullFromApi, stats, caption, className,
}: StatsProps) {
  const statsData = pullFromApi ? await fetchStats() : stats

  return (
    <section className={cx(styles.statsBlock, className)}>
      <div className={styles.stats}>
        {statsData && statsData.map((stat) => (
          <div key={stat.id} className={cx(styles.Stat)}>
            <h3 className={styles.StatLabel}>{stat.label}</h3>
            <p className={styles.StatNumber}>{stat.stat}</p>
          </div>
        ))}
      </div>
      <div className={styles.captionWrap}>
        {caption && <LexicalRenderer content={caption as PayloadLexicalReactRendererContent} />}
      </div>
    </section>
  )
}
