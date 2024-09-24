import JoinBannerCTA from '../../_components/JoinBannerCTA'

export default function Page() {
  let linkUrl = 'flare.network'

  return (
    <>
      <h2>Join Banner CTA</h2>
      <JoinBannerCTA header='Header' text='foo' link={linkUrl}
        button={{
          text: 'Join our Discord',
          link: linkUrl,
          className: undefined,
          size: 'small',
          active: true
        }}
      />
    </>
  )
}
