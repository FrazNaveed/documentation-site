import cx from 'classnames'
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

  if (docs.length === 0) {
    return (
      <div className={cx(styles.careersTeaserGridWrap, styles.careersTeaserGridWrap__empty)}>
        <div className={styles.emptyListingsWrap}>
          <LexicalRenderer content={emptyListingsText} />
        </div>
      </div>
    )
  }
  return (
    <div className={styles.careersTeaserGridWrap}>
      {docs && docs.map((career: any) => {
        const {
          id,
          slug,
          productTeam: { teamName },
          title,
          excerpt,
          locations,
        } = career
        const link = `${getCollectionPath('careers')}${slug}`
        return (
          <Link key={id} href={link} className={styles.careersTeaser}>
            <div className={styles.header}>
              <span className={styles.teamName}>
                {teamName}
              </span>
              <RightArrow />
            </div>
            <h2 className={styles.title}>{title}</h2>
            {excerpt && (
              <p className={styles.excerpt}>
                {excerpt}
              </p>
            )}
            <div className={styles.locationsWrap}>
              {Object.entries(locations)
                .filter(([, value]) => value === true)
                .map(([key], index, array) => (
                  <span
                    key={key}
                    className={styles.location}
                  >
                    {`${key}${index === array.length - 1 ? '' : ' / '}`}
                  </span>
                ))}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
