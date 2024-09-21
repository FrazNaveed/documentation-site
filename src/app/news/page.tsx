import getNewsData from '../_lib/payload/newsQueries'
import NewsFilter from '../_components/NewsFilter'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsData('Past Events')
  const twoTypesOfNews = await getNewsData('Past Events', 'Ecosystem')

  const latestNewsNav = [
    {text: 'All News', link: '/', id: 0},
    {text: 'Flare Updates', link: 'type/updates', id: 1},
    {text: 'AMA & Interviews', link: 'type/ama-interviews', id: 2},
    {text: 'Past Events', link: 'type/past-events', id: 3},
    {text: 'Ecosystem', link: 'type/ecosystem', id: 4},
    {text: 'Research', link: 'type/research', id: 5}
  ]

  return (
    <>
      <p>Header component here</p>
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