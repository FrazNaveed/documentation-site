import { notFound } from 'next/navigation'
import Hero from 'src/app/(frontend)/_components/Hero'
import { getNewsBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import type { Media } from '@/payload-types'

type PageProps = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const news = await getNewsBySlug(params.slug)

  const newsPost = news[0]
  if (!newsPost) {
    notFound()
  }
  const {
    type,
    subtype,
    logos: featuredPostLogos,
  } = newsPost
  let typeHeroBgImage
  // let featuredPostTypeName
  if (typeof type === 'object') {
    typeHeroBgImage = type.image
    // featuredPostTypeName = type.name
  }
  const subTypeHeroBgImage = subtype && typeof subtype === 'object' ? subtype.image : undefined

  return (
    <Hero
      heroStyle='standard'
      backgroundImage={subTypeHeroBgImage as Media || typeHeroBgImage as Media}
      {...(featuredPostLogos ? { logos: featuredPostLogos.map((logo) => logo.image as Media) } : {})}
    />
  )
}
