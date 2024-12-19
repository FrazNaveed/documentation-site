import LexicalRenderer from '../../LexicalRenderer'
import Link from '../../Link'
import RightArrow from '../../svgs/RightArrow'
import getCollectionPath from '../../../_utils/getCollectionPath'
import styles from './CareersTeaserGrid.module.scss'

type CareersTeaserGridProps = {
  careersListings: any
  emptyListingsText: any
}

export default function CareersTeaserGrid({ careersListings, emptyListingsText }: CareersTeaserGridProps) {
  const { docs } = careersListings
  console.log('hello', docs)
  if (docs.length === 0) {
    return (
      <div>
        <LexicalRenderer content={emptyListingsText} />
      </div>
    )
  }
  return (
    <div className={styles.careerTeaserGridWrap}>
      {docs && docs.map((career: any) => {
        const {
          id,
          slug,
          productTeam: { teamName },
          jobTitle,
          description,
          locations,
        } = career
        const link = `${getCollectionPath('careers')}${slug}`
        return (
          <Link key={id} href={link} className={styles.careersTeaser}>
            <div>
              {teamName}
              <RightArrow />
            </div>
            {jobTitle}
            {description && <LexicalRenderer content={description} />}
            {Object.entries(locations)
              .filter(([, value]) => value === true)
              .map(([key], index, array) => (
                <span
                  key={key}
                >
                  {`${key}${index === array.length - 1 ? '' : ' / '}`}
                </span>
              ))}
          </Link>
        )
      })}
    </div>
  )
}
