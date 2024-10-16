import getStatsBlockFromPage from 'src/app/(frontend)/_lib/payload/statsQueries'
import LinkBand from '../../../_components/LinkBand'

const testStats = await getStatsBlockFromPage('test')
console.log('testStats', testStats)

export default function Page() {
  return (
    <>
      <h1>Components</h1>
      test components here
      <LinkBand />
    </>
  )
}
