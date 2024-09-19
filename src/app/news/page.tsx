import { get } from 'http'
import getNewsData from '../_lib/payload/newsQueries'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsData('Past Events')
  const twoTypesOfNews = await getNewsData('Past Events', 'Ecosystem')

  return (
    <>
      <h1>News</h1>
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