import Hero from 'src/app/_components/Hero'
import { getNewsBySlug } from 'src/app/_lib/payload/newsQueries'
import type { Media, NewsSubType, NewsType } from 'src/payload-types'

type PageProps = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const news = await getNewsBySlug(params.slug)

  const featuredPost = news[0] || {}
  const {
    type = {},
    subtype,
    logos: featuredPostLogos,
  } = featuredPost
  const { image: typeHeroBgImage, name: featuredPostTypeName } = type as NewsType
  const { image: subTypeHeroBgImage } = subtype as NewsSubType || {}

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
