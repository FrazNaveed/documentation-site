import Hero from 'src/app/_components/Hero'
import getNewsData from 'src/app/_lib/payload/newsQueries'
import type { Media, NewsType } from 'src/payload-types'

export default async function Page() {
  const news = await getNewsData()

  const featuredPost = news[0] || {}
  const {
    slug: featuredPostSlug,
    excerpt: featuredPostExcerpt,
    title: featuredPostTitle,
    publishDate: featuredPostDate,
    type: featuredPostType = {},
    logos: featuredPostLogos,
  } = featuredPost
  const { heroBackgroundImage: featuredPostHeroBgImage, name: featuredPostTypeName } = featuredPostType as NewsType

  return (
    <>
      <Hero
        style='standard'
        backgroundImage={featuredPostHeroBgImage as Media}
        {...(featuredPostLogos ? {logos: featuredPostLogos.map((logo) => logo.image as Media)} : {})}
      />
    </>
  )
}