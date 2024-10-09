import getStatsBlockFromPage from 'src/app/(frontend)/_lib/payload/statsQueries'

const testStats = await getStatsBlockFromPage('test')
console.log('testStats', testStats)

export default function Page() {
  return (
    <>
      <h1>Components</h1>
      test components here
    </>
  )
}
