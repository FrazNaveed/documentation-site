import { TableWithDrawers } from '@/payload-types'
import FlareDropDates from '../../../_components/FlaredropDates/FlareDropDates'
import TableDrawers from '../../../_components/TableDrawers'
import tabledata from '../../../_components/TableDrawers/example.json'
import ProductGrid from '../../../_components/ProductGrid'

const products = [
  {
    title: 'foo',
    id: '1',
    slug: '/foo',
    description: 'Deploy a Hello World contract on Flare, using only your browser',
  },
  {
    title: 'bar',
    id: '2',
    slug: '/bar',
    description: 'High-integrity, block latency data feeds for decentralized finance on Flare',
  },
  {
    title: 'baz',
    id: '3',
    slug: '/baz',
    description: 'Verifiable, tamper-proof Web2 & Web3 data for real-world applications on Flare',
  },
  {
    title: 'qux',
    id: '4',
    slug: '/qux',
    description: 'Verifiable economic security enabling defi for BTC, XRP and DOGE on Flare',
  },
]

export default function Page() {
  return (
    <>
      <h2>Widgets!</h2>
      <FlareDropDates />
      <TableDrawers data={tabledata as TableWithDrawers} />
      <ProductGrid title='Title' products={products} />
    </>
  )
}
