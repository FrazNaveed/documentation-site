import type { Careers, ProductTeam } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import isLexicalEmpty from '../../_utils/isLexicalEmpty'
import CareersTeaserGrid from './CareersTeaserGrid'
import LexicalRenderer from '../LexicalRenderer'
import styles from './CareersPage.module.scss'

export interface CareerListing {
  id: string
  slug: string
  productTeam: {
    teamName: string
  } | ProductTeam
  title: string
  excerpt?: string
  locations: {
    Remote?: boolean
    Europe?: boolean
    Asia?: boolean
    Americas?: boolean
  }
  description?: SerializedEditorState<SerializedLexicalNode> | null
}

export type CareersListingsData = PaginatedDocs<CareerListing>

export interface CareersPageProps {
  careersListingsData?: CareersListingsData | null | undefined
  careersPageData?: Careers | null | undefined
}

export type CareersTeaserGridProps = {
  careersListings: CareersListingsData
  emptyListingsText?: Careers['emptyListingsText']
}

export default async function CareersPage({ careersListingsData, careersPageData }: CareersPageProps) {
  if (!careersListingsData || !careersPageData) {
    return null
  }

  const {
    pageTitle,
    content,
    emptyListingsText,
  } = careersPageData

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>{pageTitle || 'Open Roles'}</h2>
        {content && !isLexicalEmpty(content)
          && <LexicalRenderer content={content} />}
      </div>
      <CareersTeaserGrid careersListings={careersListingsData} emptyListingsText={emptyListingsText} />
    </div>
  )
}
