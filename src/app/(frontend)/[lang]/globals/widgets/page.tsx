import { TableWithDrawers } from '@/payload-types'
import FlareDropDates from '../../../_components/FlaredropDates/FlareDropDates'
import TableDrawers from '../../../_components/TableDrawers'
import tabledata from '../../../_components/TableDrawers/example.json'

export default function Page() {
  return (
    <>
      <h2>Widgets!</h2>
      <FlareDropDates />
      <TableDrawers data={tabledata as TableWithDrawers} />
    </>
  )
}
