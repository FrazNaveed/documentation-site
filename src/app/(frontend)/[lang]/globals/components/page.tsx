// import getStatsBlockFromPage from 'src/app/(frontend)/_lib/payload/statsQueries'
import LinkBand from '../../../_components/LinkBand'

// const testStats = await getStatsBlockFromPage('test')
// console.log('testStats', testStats)
const title = 'Exporers & Resources'
const links = [
  {
    linkText: 'foo',
    linkUrl: 'https://foo.com',
    id: '1',
  },
  {
    linkText: 'bar',
    linkUrl: 'https://bar.com',
    id: '2',
  },
  {
    linkText: 'baz',
    linkUrl: 'https://baz.com',
    id: '3',
  },
  {
    linkText: 'qux',
    linkUrl: 'https://qux.com',
    id: '4',
  },
]

export default function Page() {
  return (
    <>
      <h1>Components</h1>
      test components here
      <LinkBand title={title} links={links} />
    </>
  )
}
