import Hero from 'src/app/_components/Hero'
import getNewsData from 'src/app/_lib/payload/newsQueries'
import type { Media, NewsSubType, NewsType } from 'src/payload-types'

export default async function Page() {
  const news = await getNewsData()

  const featuredPost = news[0] || {}
  const {
    type = {},
    subtype,
    logos: featuredPostLogos,
  } = featuredPost
  const { heroBackgroundImage: typeHeroBgImage, name: featuredPostTypeName } = type as NewsType
  const { heroBackgroundImage: subTypeHeroBgImage } = subtype as NewsSubType || {}

  return (
    <>
      <Hero
        style='standard'
        backgroundImage={subTypeHeroBgImage as Media || typeHeroBgImage as Media}
        {...(featuredPostLogos ? {logos: featuredPostLogos.map((logo) => logo.image as Media)} : {})}
      />
    </>
  )
}