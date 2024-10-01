import Hero from 'src/app/(frontend)/_components/Hero'
import { getNewsBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import type { Media, NewsSubType, NewsType } from '@/payload-types'

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
