import BannerCTA from '../../_components/BannerCTA'
import Stats from '../../_components/Stats'

export default function Page() {
  const stats = [
    {label: 'Flaredrop Apr*', stat: '24.18%' },
    {label: 'flaredrop + delegating APR*', stat: '30.95%' },
    {label: 'Flaredrop + Staking APR*', stat: '35.99%' },
  ]

  const caption = '*APR values are variable and depend on total FLR staked, data provider performance and other factors. See Oracle Daemon to learn more'

  return (
    <>
      <h1>Components</h1>
      <h2>Stats</h2>
      <Stats stats={stats} caption={caption} />
    </>
  )
}
