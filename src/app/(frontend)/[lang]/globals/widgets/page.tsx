import { News, TableWithDrawers } from '@/payload-types'
import FlareDropDates from '../../../_components/FlaredropDates/FlareDropDates'
import TableDrawers from '../../../_components/TableDrawers'
import tabledata from '../../../_components/TableDrawers/example.json'
import RelatedPosts from '../../../_components/RelatedPosts'

const posts: News[] = []
const header = 'Past Events'
const linkText = 'View all past events'
const linkUrl = '/news/category/past-events'

export default function Page() {
  return (
    <>
      <h2>Widgets!</h2>
      <RelatedPosts header={header} posts={posts} linkText={linkText} linkUrl={linkUrl} />
      <FlareDropDates />
      <TableDrawers data={tabledata as TableWithDrawers} />
    </>
  )
}
