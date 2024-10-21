import { TableWithDrawers } from '@/payload-types'
import FlareDropDates from '../../../_components/FlaredropDates/FlareDropDates'
import TableDrawers from '../../../_components/TableDrawers'
import tabledata from '../../../_components/TableDrawers/example.json'
import LinkBand from '../../../_components/LinkBand'

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
      <h2>Widgets!</h2>
      <LinkBand title={title} links={links} />
      <FlareDropDates />
      <TableDrawers data={tabledata as TableWithDrawers} />
    </>
  )
}
