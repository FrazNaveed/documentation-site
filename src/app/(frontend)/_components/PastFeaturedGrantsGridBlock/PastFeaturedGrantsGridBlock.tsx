'use client'

import cx from 'classnames'
import { useState } from 'react'
import * as flags from 'country-flag-icons/react/3x2'
import type { Grant } from '@/payload-types'
import Image from 'next/image'
import ExternalLink from '../ExternalLink'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './PastFeaturedGrantsGridBlock.module.scss'
import LexicalRenderer from '../LexicalRenderer'

export type PastFeaturedGrantsGridBlockProps = {
  gridTitle?: string | null
  grantsGrid?: (number | Grant)[] | null
  className?: string
}

type CountryFlags = Record<keyof typeof flags, React.FC<{ title?: string, className?: string }>>

export default function PastFeaturedGrantsGridBlock({
  gridTitle, grantsGrid, className,
}: PastFeaturedGrantsGridBlockProps) {
  const [allShown, setAllShown] = useState(false)
  const displayShowButton = grantsGrid && grantsGrid.length > 4
  const toggleAllShown = () => {
    setAllShown((prev) => !prev)
  }
  return (
    <section className={cx(styles.wrap, className)}>
      {gridTitle && <h2 className={styles.gridTitle}>{gridTitle}</h2>}
      <div id='past-featured-grants-grid' className={styles.grantsGrid}>
        {grantsGrid?.map((grant, index) => {
          if (typeof grant === 'number') return null

          const {
            name,
            description,
            id,
            logo,
            country,
            announcementLink,
            grantCategory,
          } = grant
          const FlagComponent = (flags as CountryFlags)[country]
          return (
            <li key={id} className={cx(styles.grant, { [styles.collapsed]: index >= 4 && !allShown })}>
              {(logo || name) && (
                <div className={styles.grantHeader}>
                  {logo && typeof logo === 'object' && logo.url
                        && (
                        <div className={styles.grantLogoWrap}>
                          <Image
                            className={styles.grantLogo}
                            src={logo.url}
                            alt={logo.alt}
                            width={logo.width ?? 0}
                            height={logo.height ?? 0}
                          />
                        </div>
                        )}
                  {name && <h2 className={styles.name}>{name}</h2>}
                </div>
              )}
              <div className={styles.grantDescription}>
                {description && <LexicalRenderer content={description as PayloadLexicalReactRendererContent} />}
              </div>
              <div className={styles.grantFooter}>
                <div className={styles.grantFooterTags}>
                  {grantCategory && (
                    <div className={styles.grantCategoryWrap}>
                      {grantCategory?.map((category) => {
                        if (typeof category === 'number') return null
                        const {
                          id: categoryId,
                          title: categoryTitle,
                        } = category
                        return (<span key={categoryId} className={styles.grantCategoryTag}>{categoryTitle}</span>)
                      })}
                    </div>
                  )}
                  {FlagComponent && (
                    <div className={styles.flagWrap}>
                      <FlagComponent title={country} className={styles.flagIcon} />
                    </div>
                  )}
                </div>
                {announcementLink && (
                  <ExternalLink href={announcementLink}>Announcement</ExternalLink>
                )}
              </div>
            </li>
          )
        })}
        {displayShowButton && (
        <div className={styles.buttonWrap}>
          <button
            type='button'
            className={styles.button}
            onClick={toggleAllShown}
            aria-expanded={allShown}
            aria-controls='past-featured-grants-grid'
          >
            {allShown ? '- Show Less' : '+ Show All'}
          </button>
        </div>
        )}
      </div>
    </section>
  )
}
