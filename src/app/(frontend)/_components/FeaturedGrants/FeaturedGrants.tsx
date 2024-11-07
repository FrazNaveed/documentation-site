import Pill from 'src/app/(frontend)/_components/Pill'
import type { PageHeroGrantsInfo } from '@/payload-types'
import FeaturedGrantsCountries from './FeaturedGrantsCountries'
import styles from './FeaturedGrants.module.scss'

export type FeaturedGrantsProps = {
  grants?: PageHeroGrantsInfo
}

export default function FeaturedGrants({ grants }: FeaturedGrantsProps) {
  if (!grants || (!grants.grantsAwarded && grants.countries?.length === 0 && grants.topCategories?.length === 0)) {
    return null
  }
  const { grantsAwarded, countries, topCategories } = grants
  return (
    <div className={styles.grants}>
      <div className={styles.sectionOne}>
        <p className={styles.sectionLabel}>
          Grants Awarded
        </p>
        <p className={styles.grantsAwarded}>{grantsAwarded}</p>
      </div>
      <div className={styles.sectionTwo}>
        <p className={styles.sectionLabel}>
          Countries
        </p>
        {countries && <FeaturedGrantsCountries countries={countries} />}
      </div>
      <div className={styles.sectionThree}>
        <p className={styles.sectionLabel}>
          Top Categories
        </p>
        {topCategories && (
          <div className={styles.categories}>
            {topCategories.map((category) => {
              const { id, type, number } = category
              if (!type || typeof type !== 'object') {
                return null
              }
              const { title } = type
              const pillText = number ? `${title} (${number})` : title
              return (
                <div key={id} className={styles.category}>
                  <Pill text={pillText} size='small' />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
