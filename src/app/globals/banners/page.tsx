import JoinBannerCTA from '../../_components/JoinBannerCTA'

export default function Page() {
  const linkUrl = 'https://flare.network'

  return (
    <>
      <h2>Join Banner CTA</h2>
      <JoinBannerCTA header='[dev.sessions]' text='Q+A  / Every Wednesday / 3pm UTC'
        button={{
          text: 'Join our Discord',
          link: linkUrl,
          className: undefined,
          size: 'small',
        }}
      />
    </>
  )
}
