import { get } from 'http'
import { getNewsData, getNewsDataByType } from '../_lib/payload/newsQueries'

export default async function Page() {
  const news = await getNewsData()
  const pastEvents = await getNewsDataByType('Past Events')

  return (
    <>
      <h1>News</h1>
      {news.map((item, index) => (
        <p key={index}>Title: {item.title}</p>
        )
      )}
      <h2>Query News by Type 'Past Events'</h2>
      {pastEvents && pastEvents.map((item, index) => (
        <p key={index}>Title: {item.title}</p>
        )
      )}
    </>
  )
}