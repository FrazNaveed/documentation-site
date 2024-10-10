import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import cx from 'classnames'
import { getDictionary } from 'src/app/get-dictionary'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageBanner from 'src/app/(frontend)/_components/PageBanner'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import SideNav from 'src/app/(frontend)/_components/SideNav'
import JumpLinkAnchor from 'src/app/(frontend)/_components/SideNav/JumpLinkAnchor'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import Columns from 'src/app/(frontend)/_components/Columns'
import RichTextBlock from 'src/app/(frontend)/_components/RichTextBlock'
import Stats from 'src/app/(frontend)/_components/Stats'
import TalkingPoints from 'src/app/(frontend)/_components/TalkingPoints'
import styles from './page.module.scss'

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
  } = pageData
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
    heroComponent = (
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

                case 'richText':
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
      {(pageFooterCTA && pageFooterCTAButton?.buttonLink && pageFooterCTAButton?.buttonText)
        && <PageFooterCTA buttonText={pageFooterCTAButton?.buttonText} buttonLink={pageFooterCTAButton?.buttonLink} />}
    </div>
  )
}
