import { notFound } from 'next/navigation'
import { getDictionary } from 'src/app/get-dictionary'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageHero from 'src/app/(frontend)/_components/PageHero'

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

  const { hero } = pageData
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
        eyebrow={eyebrow}
        {...heroCtaProps}
        {...heroBackgroundImageProps}
      />
    )
  }

  return (
    <div>
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
    </div>
  )
}
