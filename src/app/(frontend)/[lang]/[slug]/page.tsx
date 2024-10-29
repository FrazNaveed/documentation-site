import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import cx from 'classnames'
import { getDictionary } from 'src/app/get-dictionary'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getNewsArchive } from 'src/app/(frontend)/_lib/payload/newsQueries'
import type { Person, Product, Wallet } from '@/payload-types'
import type { Locale } from 'src/app/i18n-config'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import DevGuideGrid from 'src/app/(frontend)/_components/DevGuideGrid'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import EventsWidget from 'src/app/(frontend)/_components/EventsWidget'
import SideNav from 'src/app/(frontend)/_components/SideNav'
import JumpLinkAnchor from 'src/app/(frontend)/_components/SideNav/JumpLinkAnchor'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import Columns from 'src/app/(frontend)/_components/Columns'
import RichTextBlock from 'src/app/(frontend)/_components/RichTextBlock'
import Stats from 'src/app/(frontend)/_components/Stats'
import TalkingPoints from 'src/app/(frontend)/_components/TalkingPoints'
import WalletsGridBlock from 'src/app/(frontend)/_components/WalletsGridBlock'
import TeamGridBlock from '../../_components/TeamGridBlock'
import ImageTextGridBlock from '../../_components/ImageTextGridBlock'
import styles from './page.module.scss'
import RelatedPosts from '../../_components/RelatedPosts'
import PrevNextLinks from '../../_components/PrevNextLinks'
import { PayloadLexicalReactRendererContent } from '../../_components/LexicalRenderer/LexicalRenderer'
import ProductGrid from '../../_components/ProductGrid'
import LinkBand from '../../_components/LinkBand'
import TallCta from '../../_components/TallCTA/TallCta'
import TwoColumnBlock from '../../_components/TwoColumnBlock'
import getCollectionPath from '../../_utils/getCollectionPath'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug, lang } = await params
  const page = await getPageBySlug(slug, lang)
  const dictionary = await getDictionary(lang)

  const pageData = page[0]
  if (!pageData) {
    notFound()
  }

  const {
    title,
    hero,
    pageBanner,
    components,
    pageFooterCTA,
    pageFooterCTAButton,
    pageTemplate,
    walletsGrid,
    relatedNewsType,
    previousPage,
    nextPage,
    linkType,
    teamGrid,
    devHub,
    grants,
  } = pageData
  let featuredEvent
  if (pageTemplate === 'events') {
    featuredEvent = await getFeaturedEvent()
  }
  let heroComponent
  if (hero) {
    const {
      headline,
      eyebrow,
      buttonText,
      buttonLink,
      buttonSecondaryText,
      buttonSecondaryLink,
      backgroundImage,
    } = hero
    const heroCtaProps = (buttonText && buttonLink) ? { cta: { text: buttonText, link: buttonLink } } : {}
    const heroCtaSecondaryProps = (buttonSecondaryText && buttonSecondaryLink)
      ? { ctaSecondary: { text: buttonSecondaryText, link: buttonSecondaryLink } }
      : {}
    const heroBackgroundImageProps = (backgroundImage && typeof backgroundImage === 'object') ? { backgroundImage } : {}
    let featuredGrants
    if (pageTemplate === 'grants' && grants) {
      featuredGrants = grants.featuredGrants
    }
    heroComponent = featuredEvent ? (
      <EventsHero
        event={featuredEvent}
        {...heroBackgroundImageProps}
      />
    ) : (
      <PageHero
        header={headline}
        eyebrow={eyebrow || title}
        {...heroCtaProps}
        {...heroCtaSecondaryProps}
        {...heroBackgroundImageProps}
        grants={featuredGrants}
      />
    )
  }

  let pageBannerComponent
  if (pageBanner) {
    const { bannerText } = pageBanner
    pageBannerComponent = (
      <PageBanner content={bannerText} />
    )
  }

  let productsGridComponent
  let devHubProducts
  if (pageTemplate === 'devHub') {
    if (devHub) {
      const {
        productsGrid,
      } = devHub
      const productsGridProps = {
        title: 'Explore the Developer Hub',
        products: (productsGrid || []).filter((product): product is Product => typeof product === 'object'),
      }
      productsGridComponent = (
        <ProductGrid {...productsGridProps} />
      )
      devHubProducts = productsGridProps.products
    }
  }

  let bugBountyCtaComponent
  if (pageTemplate === 'devHub') {
    bugBountyCtaComponent = (
      <TallCta
        title='Bug Bounty'
        content='Flare has an active Bug Bounty Program on Immunefi.'
        buttonText='Immunefi'
        buttonLink='https://immunefi.com/bug-bounty/flarenetwork/information/'
        option
      />
    )
  }

  let linkBandComponent
  if (pageTemplate === 'devHub' && devHub) {
    const { linkBand } = devHub
    const linkBandProps = {
      title: linkBand?.linkBandTitle,
      links: linkBand?.links,
    }
    linkBandComponent = (
      <LinkBand {...linkBandProps} />
    )
  }

  let pastEventsComponent
  if (pageTemplate === 'devHub') {
    const pastEventsLimit = 3
    const newsType = 'past-events'
    const pastEventsPosts = await getNewsArchive(pastEventsLimit, 1, [], newsType)
    pastEventsComponent = (
      pastEventsPosts && pastEventsPosts.docs.length > 0 && (
        <RelatedPosts
          header='Past Events'
          linkText='View all past events'
          linkUrl={`${getCollectionPath('news-types')}${newsType}`}
          posts={pastEventsPosts.docs}
        />
      )
    )
  }

  let teamGridComponent
  if (pageTemplate === 'team') {
    if (teamGrid) {
      const {
        gridTitle,
        team,
      } = teamGrid
      const teamGridProps = {
        gridTitle,
        team: (team || []).filter((teamMember): teamMember is Person => typeof teamMember === 'object'),
      }
      teamGridComponent = (
        <TeamGridBlock {...teamGridProps} />
      )
    }
  }

  let walletsGridComponent
  if (pageTemplate === 'wallets') {
    if (walletsGrid) {
      const {
        walletsGridIntro,
        wallets,
      } = walletsGrid
      const walletsGridProps = {
        intro: walletsGridIntro as PayloadLexicalReactRendererContent,
        wallets: (wallets || []).filter((wallet): wallet is Wallet => typeof wallet === 'object'),
      }
      walletsGridComponent = (
        <WalletsGridBlock
          {...walletsGridProps}
        />
      )
    }
  }

  let relatedNewsPosts
  if (relatedNewsType && typeof relatedNewsType === 'object') {
    relatedNewsPosts = await getNewsArchive(3, 1, [], relatedNewsType.slug)
  }

  return (
    <div className={styles.wrap}>
      {pageBanner?.togglePageBanner && pageBannerComponent}
      {heroComponent}
      <h1>
        {dictionary['server-component'].hello}
        , Next.js!
      </h1>
      <h2>
        lang locale =
        {
          lang
        }
      </h2>
      <h3>
        This text is rendered on the server:
        {' '}
        {dictionary['server-component'].hello}
        {' '}
        {dictionary['server-component'].and}
        {' '}
        {dictionary['server-component'].welcome}
      </h3>
      <p>Switch between en, es, and de in the URL to see different languages. Other languages will default to en.</p>
      {pageTemplate === 'devHub' && (
        <>
          {productsGridComponent}
          <DevGuideGrid devHubProducts={devHubProducts} />
          {linkBandComponent}
          {bugBountyCtaComponent}
          <EventsWidget />
          {pastEventsComponent}
        </>
      )}
      {pageTemplate === 'events' && <EventsList />}
      {pageTemplate === 'team' && teamGridComponent}
      {pageTemplate === 'wallets' && walletsGridComponent}
      {(components && components.length > 0) && (
        <div className={styles.grid}>
          <SideNav components={components} />
          <div className={styles.mainContent}>
            {components.map((component) => {
              let componentToRender
              switch (component?.blockType) {
                case 'columns':
                  componentToRender = <Columns key={component.id} {...component} />
                  break

                case 'imageTextGrid':
                  componentToRender = <ImageTextGridBlock {...component} />
                  break

                case 'richTextBlock':
                  componentToRender = <RichTextBlock key={component.id} richText={component.richText} />
                  break

                case 'stats':
                  componentToRender = <Stats key={component.id} {...component} />
                  break

                case 'talkingPoints':
                  componentToRender = <TalkingPoints key={component.id} {...component} />
                  break

                case 'twoColumn':
                  componentToRender = <TwoColumnBlock key={component.id} {...component} />
                  break

                default:
                  componentToRender = null
              }
              let jumpLinkAnchor
              if (component.createSideNavLink && component.linkText) {
                const jumpAnchorGlobalClass = 'sideNavAnchor'
                jumpLinkAnchor = (
                  <JumpLinkAnchor
                    linkText={component.linkText}
                    className={cx(styles.jumpLinkAnchor, jumpAnchorGlobalClass)}
                    jumpAnchorGlobalClass={jumpAnchorGlobalClass}
                  />
                )
              }
              return (
                <Fragment key={component.id}>
                  {jumpLinkAnchor}
                  {componentToRender}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
      {(pageFooterCTA
      && pageFooterCTAButton?.buttonLink
      && pageFooterCTAButton?.buttonText
      && pageFooterCTAButton?.backgroundImageStyle)
      && (
        <PageFooterCTA
          buttonText={pageFooterCTAButton?.buttonText}
          buttonLink={pageFooterCTAButton?.buttonLink}
          buttonSecondaryText={pageFooterCTAButton?.buttonSecondaryText ?? undefined}
          buttonSecondaryLink={pageFooterCTAButton?.buttonSecondaryLink ?? undefined}
          backgroundImage={pageFooterCTAButton?.backgroundImage}
          backgroundImageStyle={pageFooterCTAButton?.backgroundImageStyle}
        />
      )}

      {relatedNewsPosts && relatedNewsPosts.docs.length > 0 && <RelatedPosts posts={relatedNewsPosts.docs} />}

      <PrevNextLinks prevLink={previousPage} nextLink={nextPage} linkType={linkType} />
    </div>
  )
}
