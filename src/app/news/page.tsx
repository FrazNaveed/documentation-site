import getNewsData from '../_lib/payload/newsQueries'
import NewsFilter from '../_components/NewsFilter'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsData('Past Events')
  const twoTypesOfNews = await getNewsData('Past Events', 'Ecosystem')

  const latestNewsNav = ['All News', 'Flare Updates', 'AMA & Interviews', 'Past Events', 'Ecosystem', 'Research']

  return (
    <>
      <p>Header component here</p>
      <h1>Flare News</h1>
      <NewsFilter navLinks={latestNewsNav} />
      <h2>Default News query</h2>
      {news.map((item, index) => (
        <p key={index}>Title: {item.title}</p>
        )
      )}
      <h2>Query News by One Type 'Past Events'</h2>
      {pastEvents && pastEvents.map((item, index) => (
        <p key={index}>Title: {item.title}</p>
        )
      )}
      <h2>Query News by Two Types 'Past Events' and 'Ecosystem'</h2>
      {twoTypesOfNews && twoTypesOfNews.map((item, index) => (
        <p key={index}>Title: {item.title}</p>
        )
      )}
    </>
  )
}