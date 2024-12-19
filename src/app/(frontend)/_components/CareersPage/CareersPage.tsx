import CareersTeaserGrid from './CareersTeaserGrid'
import LexicalRenderer from '../LexicalRenderer'
import styles from './CareersPage.module.scss'

export default async function CareersPage({ careersListingsData, careersPageData }: any) {
  const {
    pageTitle,
    content,
    emptyListingsText,
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
