import BannerCTA from '../../_components/BannerCTA'
import Stats from '../../_components/Stats'

export default function Page() {
  const linkUrl = 'https://flare.network'

  const stats = [
    {label: 'Flaredrop Apr*', stat: '24.18%' },
    {label: 'flaredrop + delegating APR*', stat: '30.95%' },
    {label: 'Flaredrop + Staking APR*', stat: '35.99%' },
  ]

  return (
    <>
      <h2>Banner CTA</h2>
      <BannerCTA header='[dev.sessions]' text='Q+A  / Every Wednesday / 3pm UTC'
        button={{
          text: 'Join our Discord',
          link: linkUrl,
          className: undefined,
          size: 'small',
        }}
      />
      <h2>Stats</h2>
      <Stats stats={stats} caption={'render the rich text!!!'} />
    </>
  )
}
