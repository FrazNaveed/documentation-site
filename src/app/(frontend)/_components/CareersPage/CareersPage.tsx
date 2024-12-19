import getCareersListings from '../../_lib/payload/careersQueries'
import { getPageBySlug } from '../../_lib/payload/pageQueries'
import CareersTeaserGrid from './CareersTeaserGrid'
import LexicalRenderer from '../LexicalRenderer'
import styles from './CareersPage.module.scss'

export default async function CareersPage() {
  const careersListingsData = await getCareersListings()
  const careersPage = await getPageBySlug('careers')
  const careersPageData = careersPage[0] || {}
  const {
    careers: {
      pageTitle,
      content,
      emptyListingsText,
    } = {},
  } = careersPageData

  return (
    <div className={styles.wrap}>
      {(pageTitle || content) && (
        <div className={styles.header}>
          {pageTitle && <h2>{pageTitle || 'Open Roles'}</h2>}
          {content && <LexicalRenderer content={content} />}
        </div>
      )}
      <CareersTeaserGrid careersListings={careersListingsData} emptyListingsText={emptyListingsText} />
    </div>
  )
}
