import type { Media } from '@/payload-types'
import Hero from '../../_components/Hero'
import TeaserGrid from '../../_components/TeaserGrid'
import { getNewsArchive, getNewsFeatured } from '../../_lib/payload/newsQueries'
import NewsFilter from '../../_components/NewsFilter'
import getCollectionPath from '../../_utils/getCollectionPath'
import styles from './page.module.scss'
import LoadMoreGrid from '../../_components/LoadMoreGrid'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const featuredNews = await getNewsFeatured()
  const featuredNewsIds = featuredNews.map((featuredNewsItem) => featuredNewsItem.id)
  const news = await getNewsArchive(12, 0, featuredNewsIds)
  const allFetchedIds = featuredNewsIds.concat(news.docs.map((newsItem) => newsItem.id))
  const { hasNextPage } = news
  const latestNewsNav = [
    { text: 'All News', link: '/', id: 0 },
    { text: 'Flare Updates', link: 'updates', id: 1 },
    { text: 'AMA & Interviews', link: 'ama-interviews', id: 2 },
    { text: 'Past Events', link: 'past-events', id: 3 },
    { text: 'Ecosystem', link: 'ecosystem', id: 4 },
    { text: 'Research', link: 'research', id: 5 },
  ]

  const featuredPost = featuredNews[0] || news.docs[0]
  if (!news || news.docs.length === 0) {
    return <h1 className={styles.pageTitle}>No news posts found</h1>
  }
  const {
    slug: featuredPostSlug,
    // excerpt: featuredPostExcerpt,
    title: featuredPostTitle,
    publishDate: featuredPostDate,
    type: featuredPostType,
    subtype: featuredPostSubType,
    contentType,
    logos: featuredPostLogos,
    teaserThumbnail: featuredPostTeaserThumbnail,
  } = featuredPost
  let featuredPostTypeHeroBgImage; let
    featuredPostTypeName
  if (typeof featuredPostType === 'object') {
    featuredPostTypeHeroBgImage = featuredPostType.image
    featuredPostTypeName = featuredPostType.title
  }
  const featuredPostSubTypeHeroBgImage = featuredPostSubType && typeof featuredPostSubType === 'object' ? featuredPostSubType.image : undefined

  return (
    <div className={styles.wrap}>
      <Hero
        link={`${getCollectionPath('news')}/${featuredPostSlug}`}
        heroStyle='featuredNews'
        backgroundImage={featuredPostSubTypeHeroBgImage as Media || featuredPostTypeHeroBgImage as Media}
        header={featuredPostTitle}
        timestamp={featuredPostDate}
        contentType={contentType}
        {...(featuredPostTypeName ? { pill: { text: featuredPostTypeName } } : {})}
        {...(featuredPostLogos ? { logos: featuredPostLogos.map((logo) => logo.image as Media) } : {})}
        {...(typeof featuredPostTeaserThumbnail === 'object' ? { thumbnail: featuredPostTeaserThumbnail } : {})}
      />
      <h1 className={styles.pageTitle}>Flare News</h1>
      <NewsFilter navLinks={latestNewsNav} />
      <div className={styles.featuredTeaserGrid}>
        <TeaserGrid teasers={featuredNews.slice(1, 4)} gridStyle='wide' />
      </div>
      <div className={styles.teaserGrid}>
        <TeaserGrid teasers={news.docs} />
      </div>
      {hasNextPage && <LoadMoreGrid fetchFn={getNewsArchive} excludeIds={allFetchedIds} />}
    </div>
  )
}
