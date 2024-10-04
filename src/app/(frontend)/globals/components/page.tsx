import Stats from '../../_components/Stats'

export default function Page() {
  const stats = [
    { label: 'Flaredrop Apr*', stat: '24.18%', id: '12345' },
    { label: 'flaredrop + delegating APR*', stat: '30.95%', id: '23456' },
    { label: 'Flaredrop + Staking APR*', stat: '35.99%', id: '34678' },
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
