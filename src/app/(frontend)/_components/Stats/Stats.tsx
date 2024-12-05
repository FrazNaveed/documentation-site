import cx from 'classnames'
import type { Stats } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import styles from './StatsBlock.module.scss'

export type StatsProps = Stats & {
  className?: string
}

const bipsToPct = (bips: number | undefined, addedBips: number | undefined): string => {
  if (bips === undefined) return 'N/A'
  return `${((bips + (addedBips || 0)) / 100).toFixed(2)}%`
}

async function fetchStats() {
  try {
    const [delegationApr, stakingApr] = await Promise.all([
      /* TODO: Need actual FlareDrop APR endpoint */
      //  fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/delegation_apr').then((res) => res.json()),
      fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/delegation_apr').then((res) => res.json()),
      fetch('https://flare-internal-lts-api.aflabs.org/api/v0/webpage/staking_apr').then((res) => res.json()),
    ])

    const fdApr = { apr_bips: 2418 } // base Flaredrop APR hardcoded for now

    return [
      // { label: 'FlareDrop APR*', stat: bipsToPct(fdApr?.apr_bips), id: 'stat1' },
      { label: 'Flaredrop APR*', stat: bipsToPct(fdApr?.apr_bips, 0), id: 'stat1' },
      { label: 'Flaredrop + Delegation APR*', stat: bipsToPct(delegationApr?.apr_bips, fdApr?.apr_bips), id: 'stat2' },
      { label: 'Flaredrop + Staking APR*', stat: bipsToPct(stakingApr?.apr_bips, fdApr?.apr_bips), id: 'stat3' },
    ]
  } catch (error) {
    // console.error('Error fetching stats:', error)
    return [
      { label: 'Flaredrop APR*', stat: 'N/A', id: 'stat1' },
      { label: 'Flaredrop + Delegation APR*', stat: 'N/A', id: 'stat2' },
      { label: 'Flaredrop + Staking APR*', stat: 'N/A', id: 'stat3' },
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
        {caption && <LexicalRenderer content={caption} />}
      </div>
    </section>
  )
}
