import { notFound } from 'next/navigation'
import { getDictionary } from 'src/app/get-dictionary'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageHero from 'src/app/(frontend)/_components/PageHero'
import PageFooterCTA from 'src/app/(frontend)/_components/PageFooterCTA'
import Columns from 'src/app/(frontend)/_components/Columns'
import Stats from 'src/app/(frontend)/_components/Stats'
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

  return (
    <div className={styles.wrap}>
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
          <div className={styles.sideNav}>
            Side Nav
          </div>
          <div className={styles.mainContent}>
            {components.map((component) => {
              switch (component?.blockType) {
                case 'columns':
                  return <Columns key={component.id} {...component} />

                case 'stats':
                  return <Stats key={component.id} {...component} />

                default:
                  return null
              }
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
    </div>
  )
}
