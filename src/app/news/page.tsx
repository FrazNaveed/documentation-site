import getNewsData from '../_lib/payload/newsQueries'

export default async function Page() {
  const news = await getNewsData()

  return (
    <>
      <h1>News</h1>
      {news.map((item) => (
        <p>Title: {item.title}</p>
        )
      )}
    </>
  )
}