import Hero from '../_components/Hero'
import { getNewsData } from '../_lib/payload/newsQueries'
import NewsFilter from '../_components/NewsFilter'
import type { Media, NewsSubType, NewsType } from 'src/payload-types'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsData('Past Events')
  const twoTypesOfNews = await getNewsData('Past Events', 'Ecosystem')

  const latestNewsNav = [
    {text: 'All News', link: '/', id: 0},
    {text: 'Flare Updates', link: 'updates', id: 1},
    {text: 'AMA & Interviews', link: 'ama-interviews', id: 2},
    {text: 'Past Events', link: 'past-events', id: 3},
    {text: 'Ecosystem', link: 'ecosystem', id: 4},
    {text: 'Research', link: 'research', id: 5}
  ]

  const featuredPost = news[0] || {}
  const {
    slug: featuredPostSlug,
    excerpt: featuredPostExcerpt,
    title: featuredPostTitle,
    publishDate: featuredPostDate,
    type: featuredPostType = {},
    subtype: featuredPostSubType,
    logos: featuredPostLogos,
    teaserThumbnail: featuredPostTeaserThumbnail,
  } = featuredPost
  const { heroBackgroundImage: featuredPostTypeHeroBgImage, name: featuredPostTypeName } = featuredPostType as NewsType
  const { heroBackgroundImage: featuredPostSubTypeHeroBgImage } = featuredPostSubType as NewsSubType | null || {}

  return (
    <>
      <Hero
        link={`/news/${featuredPostSlug}`}
        style='featuredNews'
        backgroundImage={featuredPostSubTypeHeroBgImage as Media || featuredPostTypeHeroBgImage as Media}
        header={featuredPostExcerpt || featuredPostTitle}
        timestamp={featuredPostDate}
        pill={{ text: featuredPostTypeName }}
        {...(featuredPostLogos ? {logos: featuredPostLogos.map((logo) => logo.image as Media)} : {})}
        thumbnail={featuredPostTeaserThumbnail as Media | null | undefined}
      />
      <h1>Flare News</h1>
      <NewsFilter navLinks={latestNewsNav} />
      <h2>Default News query</h2>
      {news.map((item, index) => (
        <p key={item.id}>Title: {item.title}</p>
        )
      )}
      <h2>Query News by One Type 'Past Events'</h2>
      {pastEvents?.map((item, index) => (
        <p key={item.id}>Title: {item.title}</p>
        )
      )}
      <h2>Query News by Two Types 'Past Events' and 'Ecosystem'</h2>
      {twoTypesOfNews?.map((item, index) => (
        <p key={item.id}>Title: {item.title}</p>
        )
      )}
    </>
  )
}