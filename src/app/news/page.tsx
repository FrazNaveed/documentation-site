import Hero from '../_components/Hero'
import TeaserGrid from '../_components/TeaserGrid'
import { getNewsData } from '../_lib/payload/newsQueries'
import NewsFilter from '../_components/NewsFilter'
import type { Media, NewsSubType, NewsType } from 'src/payload-types'
import styles from './page.module.scss'

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
  const { image: featuredPostTypeHeroBgImage, name: featuredPostTypeName } = featuredPostType as NewsType
  const { image: featuredPostSubTypeHeroBgImage } = featuredPostSubType as NewsSubType | null || {}

  return (
    <div className={styles.wrap}>
      <Hero
        link={`/news/${featuredPostSlug}`}
        style='featuredNews'
        backgroundImage={featuredPostSubTypeHeroBgImage as Media || featuredPostTypeHeroBgImage as Media}
        header={featuredPostTitle}
        timestamp={featuredPostDate}
        pill={{ text: featuredPostTypeName }}
        {...(featuredPostLogos ? {logos: featuredPostLogos.map((logo) => logo.image as Media)} : {})}
        thumbnail={featuredPostTeaserThumbnail as Media | null | undefined}
      />
      <h1 className={styles.pageTitle}>Flare News</h1>
      <NewsFilter navLinks={latestNewsNav} />
      <div className={styles.teaserGrid}>
        <TeaserGrid teasers={news} />
      </div>
    </div>
  )
}