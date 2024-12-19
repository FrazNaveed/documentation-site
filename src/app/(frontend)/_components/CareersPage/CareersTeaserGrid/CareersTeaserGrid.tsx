import cx from 'classnames'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import type { CareersTeaserGridProps } from '../CareersPage'
import LexicalRenderer from '../../LexicalRenderer'
import Link from '../../Link'
import RightArrow from '../../svgs/RightArrow'
import getCollectionPath from '../../../_utils/getCollectionPath'
import styles from './CareersTeaserGrid.module.scss'

export default function CareersTeaserGrid({ careersListings, emptyListingsText }: CareersTeaserGridProps) {
  const { docs } = careersListings

  // Using any as we're only checking the structure
  const isLexicalEmpty = (content: any): boolean => content?.root?.children?.[0]?.type === 'paragraph'
    && content?.root?.children?.[0]?.children?.length === 0
    && content?.root?.children?.length === 1

  if (docs.length === 0) {
    return !isLexicalEmpty(emptyListingsText) ? (
      <div className={cx(styles.careersTeaserGridWrap, styles.careersTeaserGridWrap__empty)}>
        <div className={styles.emptyListingsWrap}>
          <LexicalRenderer content={emptyListingsText as SerializedEditorState<SerializedLexicalNode>} />
        </div>
      </div>
    ) : null
  }
  return (
    <div className={styles.careersTeaserGridWrap}>
      {docs && docs.map((career) => {
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
