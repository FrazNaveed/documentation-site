import getNewsData from '../_lib/payload/newsQueries'
import NewsFilter from '../_components/NewsFilter'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsData('Past Events')
  const twoTypesOfNews = await getNewsData('Past Events', 'Ecosystem')

  const latestNewsNav = [
    {text: 'All News', link: '/', id: 0},
    {text: 'Flare Updates', link: '/#', id: 1}, // 'type/updates'
    {text: 'AMA & Interviews', link: '/#', id: 2}, // 'type/ama-interviews'
    {text: 'Past Events', link: '/#', id: 3}, // 'type/past-events'
    {text: 'Ecosystem', link: '/#', id: 4}, // 'type/ecosystem'
    {text: 'Research', link: '/#', id: 5} // 'type/research'
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