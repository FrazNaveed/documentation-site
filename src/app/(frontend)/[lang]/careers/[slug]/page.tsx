import { notFound } from 'next/navigation'
import Link from 'next/link'
import getCollectionPath from '../../../_utils/getCollectionPath'
import { getCareerListingBySlug } from '../../../_lib/payload/careersQueries'
import Hero from '../../../_components/Hero'
import LeftArrow from '../../../_components/svgs/LeftArrow'
import CareersLocations from '../../../_components/CareerLocations'
import styles from './page.module.scss'
import isLexicalEmpty from '../../../_utils/isLexicalEmpty'
import LexicalRenderer from '../../../_components/LexicalRenderer'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function getCareerListingData(slug: string) {
  const careerListing = await getCareerListingBySlug(slug)
  const listing = careerListing[0]
  if (!listing) {
    notFound()
  }
  return listing
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const listing = await getCareerListingData(slug)
  const {
    title,
    productTeam: {
      teamName,
    },
    locations,
    description,
  } = listing
  return (
    <article className={styles.article}>
      {/* <div className={styles.heroWrapper}> */}
      <Hero
        header={title}
        heroStyle='standard'
      />
      {/* </div> */}
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <header className={styles.header}>
            <Link href={getCollectionPath('careers')} className={styles.backLink}>
              <LeftArrow />
              Back to All Careers
            </Link>
            {title && <h1 className={styles.title}>{title}</h1>}
            <div className={styles.meta}>
              <span className={styles.teamName}>{teamName}</span>
              <CareersLocations locations={locations} />
            </div>
            <div className={styles.contentCol}>
              {!isLexicalEmpty(description) && <LexicalRenderer content={description} />}
            </div>
          </header>
        </div>
      </div>
    </article>
  )
}
