// 'use client'

import cx from 'classnames'
// import { useState } from 'react'
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
}

type CountryFlags = {
  [key: string]: React.FC<{ title?: string, className?: string}>
}

export default function PastFeaturedGrantsGridBlock({ gridTitle, grantsGrid }: PastFeaturedGrantsGridBlockProps) {
  return (
    <section className={styles.wrap}>
      {gridTitle && <h2 className={styles.gridTitle}>{gridTitle}</h2>}
      <div className={styles.grantsGrid}>
        {grantsGrid?.map((grant :any, index) => {
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
            <>
              <li key={id} className={cx(styles.grant, index >= 6 && styles.collapsed)}>
                <div>
                  {(logo || name) && (
                    <div className={styles.grantHeader}>
                      {logo && typeof logo === 'object' && logo.url
                        && (
                        <div className={styles.grantLogoWrap}>
                          <Image
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
                          {grantCategory?.map((category: any) => (
                            <span key={id} className={styles.grantCategoryTag}>{category.title}</span>
                          ))}
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
                </div>
              </li>
              {index === 5 && <span>Show button here</span>}
            </>
          )
        })}
      </div>
    </section>
  )
}
