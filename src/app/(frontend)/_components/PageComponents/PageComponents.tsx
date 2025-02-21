import { Fragment } from 'react'
import cx from 'classnames'
import type { Locale } from 'src/app/i18n-config'
import ApplicationProcessBlock from 'src/app/(frontend)/_components/ApplicationProcessBlock'
import BrandLogoRollBlock from 'src/app/(frontend)/_components/BrandLogoRollBlock'
import CareersPage from '@/src/app/(frontend)/_components/CareersPage'
import CodeCTABlock from '@/src/app/(frontend)/_components/CodeCTABlock'
import Columns from 'src/app/(frontend)/_components/Columns'
import DecentralizedPanel from 'src/app/(frontend)/_components/DecentralizedPanel'
import DevGuideGrid from 'src/app/(frontend)/_components/DevGuideGrid'
import FormBlock from '@/src/app/(frontend)/_components/FormBlock'
import ImageTextGridBlock from 'src/app/(frontend)/_components/ImageTextGridBlock'
import JumpLinkAnchor from 'src/app/(frontend)/_components/SideNav/JumpLinkAnchor'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import EventsWidget from 'src/app/(frontend)/_components/EventsWidget'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import FastPanel from 'src/app/(frontend)/_components/FastPanel'
import FlareDropDates from 'src/app/(frontend)/_components/FlaredropDates'
import LayerCakePanel from 'src/app/(frontend)/_components/LayerCakePanel'
import LinkBand from 'src/app/(frontend)/_components/LinkBand'
import MarqueeGallery from 'src/app/(frontend)/_components/MarqueeGallery'
import OfficialChannelsBlock from 'src/app/(frontend)/_components/OfficialChannelsBlock'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import PageHeroCentered from 'src/app/(frontend)/_components/PageHeroCentered'
import PageTeaserGrid from 'src/app/(frontend)/_components/PageTeaserGrid'
import PastFeaturedGrantsGridBlock from 'src/app/(frontend)/_components/PastFeaturedGrantsGridBlock'
import PrevNextLinks from 'src/app/(frontend)/_components/PrevNextLinks'
import ProductGrid from 'src/app/(frontend)/_components/ProductGrid'
import RegionalLinkGrid from 'src/app/(frontend)/_components/RegionalLinkGrid'
import RelatedPosts from 'src/app/(frontend)/_components/RelatedPosts'
import ResponsiveImageBlock from 'src/app/(frontend)/_components/ResponsiveImageBlock'
import RichTextBlock from 'src/app/(frontend)/_components/RichTextBlock'
import SecurePanel from 'src/app/(frontend)/_components/SecurePanel'
import SideNav from 'src/app/(frontend)/_components/SideNav'
import Stats from 'src/app/(frontend)/_components/Stats'
import StepsBlock from 'src/app/(frontend)/_components/StepsBlock'
import SubscriptionBannerCTA from 'src/app/(frontend)/_components/SubscriptionBannerCTA'
import TableDrawers from 'src/app/(frontend)/_components/TableDrawers'
import TalkingPoints from 'src/app/(frontend)/_components/TalkingPoints'
import TallCta from 'src/app/(frontend)/_components/TallCTA/TallCta'
import TeamGridBlock from 'src/app/(frontend)/_components/TeamGridBlock'
import TokenLinkBlock from 'src/app/(frontend)/_components/TokenLinkBlock'
import TwoColumnBlock from 'src/app/(frontend)/_components/TwoColumnBlock'
import TwoColumnCtaBlock from 'src/app/(frontend)/_components/TwoColumnCtaBlock/TwoColumnCtaBlock'
import VideoBlock from 'src/app/(frontend)/_components/VideoBlock'
import WalletsGridBlock from 'src/app/(frontend)/_components/WalletsGridBlock'
import { getCareersListings } from 'src/app/(frontend)/_lib/payload/careersQueries'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getNewsArchive, getNewsTypeBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import type {
  Page,
  Person,
  Product,
  Wallet,
} from '@/payload-types'
import type { CareersListingsData } from '../CareersPage/CareersPage'
import { getPageFooterCtaSocialChannels } from '../../_lib/payload/pageQueries'
import FeaturedNewsCarouselBlock from '../FeaturedNewsCarouselBlock'
import styles from './PageComponents.module.scss'

export type PageComponentsProps = {
  pageData: Page
  lang: Locale
  addSubscriptionBanner?: boolean
}

export default async function PageComponents({ pageData, lang, addSubscriptionBanner }: PageComponentsProps) {
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
    careers,
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
      textLinkText,
      textLinkButton,
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
    const heroCtaTextProps = (textLinkText && textLinkButton)
      ? { ctaText: { text: textLinkText, link: textLinkButton } }
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
          {...heroCtaTextProps}
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

  let careersComponent
  if (pageTemplate === 'careers') {
    const careersListingsData = await getCareersListings()
    if (careersListingsData) {
      careersComponent = (
        <CareersPage
          careersListingsData={careersListingsData as CareersListingsData}
          careersPageData={careers}
        />
      )
    }
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
    const newsTypeQuery = await getNewsTypeBySlug(newsType)
    const newsTypeData = newsTypeQuery[0]
    if (newsTypeData) {
      const pastEventsPosts = await getNewsArchive(pastEventsLimit, 1, [], newsTypeData.id)
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
        intro: walletsGridIntro,
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
    relatedNewsPosts = await getNewsArchive(3, 1, [], relatedNewsType.id)
  }

  const pageFooterCtaSocialChannels = await getPageFooterCtaSocialChannels(lang)

  const jumpLinkAnchorGlobalClass = 'sideNavAnchor'
  let jumpLinkAnchorIndex = 0

  return (
    <div className={styles.wrap}>
      {pageBanner?.togglePageBanner && pageBannerComponent}
      {heroComponent}
      {pageTemplate === 'careers' && careersComponent}
      {pageTemplate === 'devHub' && (
        <>
          {productsGridComponent}
          <DevGuideGrid devHubProducts={devHubProducts} />
          {linkBandComponent}
          {bugBountyCtaComponent}
          <EventsWidget blockType='eventsWidget' hasContainerClass />
          {pastEventsComponent}
        </>
      )}
      {pageTemplate === 'events' && <EventsList />}
      {pageTemplate === 'team' && teamGridComponent}
      {pageTemplate === 'wallets' && walletsGridComponent}
      {(components && components.length > 0) && (
        <div className={styles.grid}>
          <SideNav components={components} jumpLinkAnchorGlobalClass={jumpLinkAnchorGlobalClass} />
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

                case 'decentralizedPanel':
                  componentToRender = (
                    <DecentralizedPanel key={component.id} {...component} className={componentClass} />
                  )
                  break

                case 'eventsWidget':
                  componentToRender = (
                    <EventsWidget
                      key={component.id}
                      {...component}
                      className={componentClass}
                      hasContainerClass={false}
                    />
                  )
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

                case 'fastPanel':
                  componentToRender = <FastPanel key={component.id} {...component} className={componentClass} />
                  break

                case 'flareDropDates':
                  componentToRender = <FlareDropDates key={component.id} {...component} className={componentClass} />
                  break

                case 'contactForm':
                case 'newsletterSignupForm':
                  componentToRender = <FormBlock key={component.id} {...component} className={componentClass} />
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

                case 'layerCake':
                  componentToRender = <LayerCakePanel key={component.id} {...component} className={componentClass} />
                  break

                case 'officialChannels':
                  componentToRender = (
                    <OfficialChannelsBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                      lang={lang}
                    />
                  )
                  break

                case 'pageTeaserGrid':
                  componentToRender = <PageTeaserGrid key={component.id} {...component} className={componentClass} />
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

                case 'responsiveImage':
                  componentToRender = (
                    <ResponsiveImageBlock
                      key={component.id}
                      {...component}
                      className={componentClass}
                    />
                  )
                  break

                case 'securePanel':
                  componentToRender = <SecurePanel key={component.id} {...component} className={componentClass} />
                  break

                case 'stats':
                  componentToRender = <Stats key={component.id} {...component} className={componentClass} />
                  break

                case 'steps':
                  componentToRender = <StepsBlock key={component.id} {...component} className={componentClass} />
                  break

                case 'tableDrawers':
                  componentToRender = <TableDrawers key={component.id} data={component} className={componentClass} />
                  break

                case 'talkingPoints':
                  componentToRender = <TalkingPoints key={component.id} {...component} className={componentClass} />
                  break

                case 'tokenLink':
                  componentToRender = <TokenLinkBlock key={component.id} {...component} className={componentClass} />
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
                jumpLinkAnchor = (
                  <JumpLinkAnchor
                    linkText={component.linkText}
                    className={cx(styles.jumpLinkAnchor, jumpLinkAnchorGlobalClass)}
                    index={jumpLinkAnchorIndex}
                  />
                )
                jumpLinkAnchorIndex += 1
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
          selectSocialChannels={pageFooterCtaSocialChannels.selectSocialChannels}
          useSocialMediaButtons={pageFooterCTAButton?.useSocialMediaButtons}
          lang={lang}
        />
      )}

      <PrevNextLinks prevLink={previousPage} nextLink={nextPage} linkType={linkType} />

      {relatedNewsPosts && relatedNewsPosts.docs.length > 0 && <RelatedPosts posts={relatedNewsPosts.docs} />}

      {addSubscriptionBanner && <SubscriptionBannerCTA />}
    </div>
  )
}
