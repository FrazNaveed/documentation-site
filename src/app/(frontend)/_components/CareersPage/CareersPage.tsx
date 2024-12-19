import getCareersListings from '../../_lib/payload/careersQueries'
import { getPageBySlug } from '../../_lib/payload/pageQueries'
import CareersTeaserGrid from './CareersTeaserGrid'
import styles from './CareersPage.module.scss'

export default async function CareersPage() {
  const careersListings = await getCareersListings()
  const careersPage = await getPageBySlug('careers')
  const careersPageData = careersPage[0] || {}
  // console.log(careers)
  // console.log('page: ', careersPageData)
  const {
    careers: {
      pageTitle,
      // content,
      emptyListingsText,
    } = {},
  } = careersPageData

  return (
    <div className={styles.wrap}>
      {/* get copy from page template */}
      <h2>{pageTitle || 'Open Roles'}</h2>
      <CareersTeaserGrid careers={careersListings} emptyListingsText={emptyListingsText} />
    </div>
  )
}
