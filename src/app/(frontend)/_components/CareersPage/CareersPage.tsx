import getCareersListings from '../../_lib/payload/careersQueries'
import CareersTeaserGrid from './CareersTeaserGrid'
import styles from './CareersPage.module.scss'

export default async function CareersPage() {
  const careers = await getCareersListings()
  console.log(careers)
  return (
    <div className={styles.wrap}>
      {/* get copy from page template */}
      <h2>Open Roles</h2>
      <CareersTeaserGrid careers={careers} />
    </div>
  )
}
