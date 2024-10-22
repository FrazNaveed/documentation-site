import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import cx from 'classnames'
import { getDictionary } from 'src/app/get-dictionary'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import type { Locale } from 'src/app/i18n-config'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import SideNav from 'src/app/(frontend)/_components/SideNav'
import JumpLinkAnchor from 'src/app/(frontend)/_components/SideNav/JumpLinkAnchor'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import Columns from 'src/app/(frontend)/_components/Columns'
import RichTextBlock from 'src/app/(frontend)/_components/RichTextBlock'
import Stats from 'src/app/(frontend)/_components/Stats'
import TalkingPoints from 'src/app/(frontend)/_components/TalkingPoints'
import WalletsGridBlock from 'src/app/(frontend)/_components/WalletsGridBlock'
import type { Person, Product, Wallet } from '@/payload-types'
import { getNewsArchive } from 'src/app/(frontend)/_lib/payload/newsQueries'
import TeamGridBlock from '../../_components/TeamGridBlock'
import styles from './page.module.scss'
import RelatedPosts from '../../_components/RelatedPosts'
import PrevNextLinks from '../../_components/PrevNextLinks'
import { PayloadLexicalReactRendererContent } from '../../_components/LexicalRenderer/LexicalRenderer'
import ProductGrid from '../../_components/ProductGrid'
import LinkBand from '../../_components/LinkBand'

export const dynamic = 'force-dynamic'

export default async function Page({
  params: { slug, lang },
}: {
  params: { slug: string, lang: Locale }
}) {
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
  } = pageData
  let featuredEvent
  if (pageTemplate === 'events') {
    featuredEvent = await getFeaturedEvent()
  }
  let heroComponent
  if (hero) {
    const {
      style,
      headline,
      eyebrow,
      buttonText,
      buttonLink,
      backgroundImage,
    } = hero
    const heroCtaProps = (buttonText && buttonLink) ? { cta: { text: buttonText, link: buttonLink } } : {}
    const heroBackgroundImageProps = (backgroundImage && typeof backgroundImage === 'object') ? { backgroundImage } : {}
    heroComponent = featuredEvent ? (
      <EventsHero
        event={featuredEvent}
        {...heroBackgroundImageProps}
      />
    ) : (
      <PageHero
        heroStyle={style}
        header={headline}
        eyebrow={eyebrow || title}
        {...heroCtaProps}
        {...heroBackgroundImageProps}
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
    }
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
          {linkBandComponent}
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
                  componentToRender = <Columns {...component} />
                  break

                case 'richTextBlock':
                  componentToRender = <RichTextBlock richText={component.richText} />
                  break

                case 'stats':
                  componentToRender = <Stats {...component} />
                  break

                case 'talkingPoints':
                  return <TalkingPoints key={component.id} {...component} />

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
          backgroundImage={pageFooterCTAButton?.backgroundImage}
          backgroundImageStyle={pageFooterCTAButton?.backgroundImageStyle}
        />
      )}

      {relatedNewsPosts && relatedNewsPosts.docs.length > 0 && <RelatedPosts posts={relatedNewsPosts.docs} />}

      <PrevNextLinks prevLink={previousPage} nextLink={nextPage} linkType={linkType} />
    </div>
  )
}
