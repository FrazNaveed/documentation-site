import BannerCTA from 'src/app/(frontend)/_components/BannerCTA'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import SubscriptionBannerCTA from 'src/app/(frontend)/_components/SubscriptionBannerCTA'

export default function Page() {
  const linkUrl = 'https://flare.network'

  return (
    <>
      <h2>Banner CTA</h2>
      <BannerCTA
        header='[dev.sessions]'
        text='Q+A  / Every Wednesday / 3pm UTC'
        button={{
          text: 'Join our Discord',
          link: linkUrl,
          className: undefined,
          size: 'small',
        }}
      />
      <br />
      <h2>Page Banner</h2>
      <PageBanner />
      <br />
      <h2>Subscription CTA</h2>
      <SubscriptionBannerCTA
        header='Subscribe to the Flare Newsletter'
        text='Join over 20,000 fellow blockchain enthusiasts. Sign up to our newsletter today to receive our exclusive web3 insights and be informed of our latest product releases.'
        buttonText='Subscribe'
        placeholder='Type your email here|'
      />
    </>
  )
}
