import { Fragment } from 'react'
import cx from 'classnames'
import type { Locale } from 'src/app/i18n-config'
import ApplicationProcessBlock from 'src/app/(frontend)/_components/ApplicationProcessBlock'
import BrandLogoRollBlock from 'src/app/(frontend)/_components/BrandLogoRollBlock'
import CodeCTABlock from '@/src/app/(frontend)/_components/CodeCTABlock'
import Columns from 'src/app/(frontend)/_components/Columns'
import DevGuideGrid from 'src/app/(frontend)/_components/DevGuideGrid'
import ImageTextGridBlock from 'src/app/(frontend)/_components/ImageTextGridBlock'
import JumpLinkAnchor from 'src/app/(frontend)/_components/SideNav/JumpLinkAnchor'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import EventsWidget from 'src/app/(frontend)/_components/EventsWidget'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import FlareDropDates from 'src/app/(frontend)/_components/FlaredropDates'
import LinkBand from 'src/app/(frontend)/_components/LinkBand'
import MarqueeGallery from 'src/app/(frontend)/_components/MarqueeGallery'
import OfficialChannelsBlock from 'src/app/(frontend)/_components/OfficialChannelsBlock'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import PageHeroCentered from 'src/app/(frontend)/_components/PageHeroCentered'
import PastFeaturedGrantsGridBlock from 'src/app/(frontend)/_components/PastFeaturedGrantsGridBlock'
import PrevNextLinks from 'src/app/(frontend)/_components/PrevNextLinks'
import ProductGrid from 'src/app/(frontend)/_components/ProductGrid'
import RegionalLinkGrid from 'src/app/(frontend)/_components/RegionalLinkGrid'
import RelatedPosts from 'src/app/(frontend)/_components/RelatedPosts'
import RichTextBlock from 'src/app/(frontend)/_components/RichTextBlock'
import SideNav from 'src/app/(frontend)/_components/SideNav'
import Stats from 'src/app/(frontend)/_components/Stats'
import TableDrawers from 'src/app/(frontend)/_components/TableDrawers'
import TalkingPoints from 'src/app/(frontend)/_components/TalkingPoints'
import TallCta from 'src/app/(frontend)/_components/TallCTA/TallCta'
import TeamGridBlock from 'src/app/(frontend)/_components/TeamGridBlock'
import TwoColumnBlock from 'src/app/(frontend)/_components/TwoColumnBlock'
import TwoColumnCtaBlock from 'src/app/(frontend)/_components/TwoColumnCtaBlock/TwoColumnCtaBlock'
import VideoBlock from 'src/app/(frontend)/_components/VideoBlock'
import WalletsGridBlock from 'src/app/(frontend)/_components/WalletsGridBlock'
import { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getNewsArchive } from 'src/app/(frontend)/_lib/payload/newsQueries'
import type {
  Page,
  Person,
  Product,
  Wallet,
} from '@/payload-types'
import FeaturedNewsCarouselBlock from '../FeaturedNewsCarouselBlock'
import styles from './PageComponents.module.scss'

export type PageComponentsProps = {
  pageData: Page
  lang: Locale
}

export default async function PageComponents({ pageData, lang }: PageComponentsProps) {
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
  } = pageData
  let featuredEvent
  if (pageTemplate === 'events') {
    featuredEvent = await getFeaturedEvent()
  }
  let heroComponent
  if (hero) {
    const {
      style: heroStyle,
      headline,
      eyebrow,
      hideEyebrow,
      buttonText,
      buttonLink,
      buttonSecondaryText,
      buttonSecondaryLink,
      backgroundImage,
      showBackgroundVideo,
      grantsInfo,
      logo: heroLogo,
      text: heroText,
      protocolInfo,
    } = hero
    const heroCtaProps = (buttonText && buttonLink) ? { cta: { text: buttonText, link: buttonLink } } : {}
    const heroCtaSecondaryProps = (buttonSecondaryText && buttonSecondaryLink)
      ? { ctaSecondary: { text: buttonSecondaryText, link: buttonSecondaryLink } }
      : {}
    const heroBackgroundImageProps = (backgroundImage && typeof backgroundImage === 'object') ? { backgroundImage } : {}
    if (featuredEvent) {
      heroComponent = (
        <EventsHero
          event={featuredEvent}
          {...heroBackgroundImageProps}
        />
      )
    } else if (heroStyle === 'protocol' || heroStyle === 'centered') {
      heroComponent = (
        <PageHeroCentered
          heroStyle={heroStyle}
          header={headline}
          eyebrow={eyebrow || title}
          hideEyebrow={hideEyebrow}
          {...heroCtaProps}
          {...heroCtaSecondaryProps}
          {...heroBackgroundImageProps}
          showBackgroundVideo={showBackgroundVideo}
          logo={heroLogo}
          text={heroText}
          protocolInfo={protocolInfo}
          lang={lang}
        />
      )
    } else {
      heroComponent = (
        <PageHero
          header={headline}
          eyebrow={eyebrow || title}
          {...heroCtaProps}
          {...heroCtaSecondaryProps}
          {...heroBackgroundImageProps}
          grants={grantsInfo}
        />
      )
    }
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
          <div className={cx(styles.mainContent, { [styles.mainContent__fullWidth]: pageTemplate === 'fullWidth' })}>
            {components.map((component) => {
              let componentToRender
              let componentClass = styles.block
              if (component.standardTopMargin) {
                componentClass += ` ${styles.block__standardTopMargin}`
              }
              if (component.standardBottomMargin) {
                componentClass += ` ${styles.block__standardBottomMargin}`
              }
              switch (component?.blockType) {
                case 'applicationProcess':
                  componentToRender = (
                    <ApplicationProcessBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'brandLogoRoll':
                  componentToRender = (
                    <BrandLogoRollBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'codeCta':
                  componentToRender = <CodeCTABlock key={component.id} {...component} className={componentClass} />
                  break

                case 'columns':
                  componentToRender = <Columns key={component.id} {...component} className={componentClass} />
                  break

                case 'featuredNewsCarousel':
                  componentToRender = (
                    <FeaturedNewsCarouselBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'flareDropDates':
                  componentToRender = <FlareDropDates key={component.id} {...component} className={componentClass} />
                  break

                case 'imageTextGrid':
                  componentToRender = (
                    <ImageTextGridBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'officialChannels':
                  componentToRender = (
                    <OfficialChannelsBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'pastFeaturedGrantsGrid':
                  componentToRender = (
                    <PastFeaturedGrantsGridBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'regionalLinkGrid':
                  componentToRender = <RegionalLinkGrid key={component.id} {...component} className={componentClass} />
                  break

                case 'richTextBlock':
                  componentToRender = (
                    <RichTextBlock
                      key={component.id}
                      richText={component.richText}
                      className={componentClass}
                    />
                  )
                  break

                case 'marqueeGallery':
                  componentToRender = (
                    <MarqueeGallery
                      key={component.id}
                      {...component}
                      className={componentClass}
                      locale={lang}
                    />
                  )
                  break

                case 'stats':
                  componentToRender = <Stats key={component.id} {...component} className={componentClass} />
                  break

                case 'tableDrawers':
                  componentToRender = <TableDrawers key={component.id} data={component} className={componentClass} />
                  break

                case 'talkingPoints':
                  componentToRender = <TalkingPoints key={component.id} {...component} className={componentClass} />
                  break

                case 'twoColumn':
                  componentToRender = <TwoColumnBlock key={component.id} {...component} className={componentClass} />
                  break

                case 'twoColumnCta':
                  componentToRender = <TwoColumnCtaBlock key={component.id} {...component} className={componentClass} />
                  break

                case 'videoEmbedBlock':
                  componentToRender = <VideoBlock key={component.id} {...component} className={componentClass} />
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
      && (
        (pageFooterCTAButton?.buttonLink && pageFooterCTAButton?.buttonText)
        || pageFooterCTAButton?.useSocialMediaButtons
      )
      && pageFooterCTAButton?.backgroundImageStyle)
      && (
        <PageFooterCTA
          buttonText={pageFooterCTAButton?.buttonText}
          buttonLink={pageFooterCTAButton?.buttonLink}
          buttonSecondaryText={pageFooterCTAButton?.buttonSecondaryText ?? undefined}
          buttonSecondaryLink={pageFooterCTAButton?.buttonSecondaryLink ?? undefined}
          backgroundImage={pageFooterCTAButton?.backgroundImage}
          backgroundImageStyle={pageFooterCTAButton?.backgroundImageStyle}
          socialMediaButtons={pageFooterCTAButton?.socialMediaButtons}
          useSocialMediaButtons={pageFooterCTAButton?.useSocialMediaButtons}
        />
      )}

      <PrevNextLinks prevLink={previousPage} nextLink={nextPage} linkType={linkType} />

      {relatedNewsPosts && relatedNewsPosts.docs.length > 0 && <RelatedPosts posts={relatedNewsPosts.docs} />}
    </div>
  )
}
