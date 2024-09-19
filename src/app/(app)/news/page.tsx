import getNewsData from '../_lib/payload/newsQueries'

console.log('News', getNewsData)

export default function Page() {
  return (
    <h1>Hello, I am News.</h1>
  )
}
