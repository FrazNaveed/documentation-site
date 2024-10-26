import * as flags from 'country-flag-icons/react/3x2'
import Pill from 'src/app/(frontend)/_components/Pill'
import type { Grants } from '@/payload-types'
import styles from './FeaturedGrants.module.scss'

export type FeaturedGrantsProps = {
  grants?: Grants['featuredGrants']
}

export default function FeaturedGrants({ grants }: FeaturedGrantsProps) {
  if (!grants) {
    return null
  }
  const { grantsAwarded, countries, topCategories } = grants
  const countriesLength = countries?.length
  const maxFlagsToShow = 10
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
        {countries && (
          <div className={styles.countries}>
            <p className={styles.countryCount}>{countriesLength}</p>
            <div className={styles.flags}>
              {countries.slice(0, maxFlagsToShow).map((countryObj) => {
                const { country } = countryObj
                const FlagComponent = flags[country]
                return FlagComponent && (
                  <div className={styles.flag}>
                    <FlagComponent title={country} className={styles.flag_Icon} />
                  </div>
                )
              })}
              {(countriesLength as number) > maxFlagsToShow && (
                <div className={styles.extraCountryCount}>
                  {`+${(countriesLength as number) - maxFlagsToShow}`}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.sectionThree}>
        <p className={styles.sectionLabel}>
          Top Categories
        </p>
        {topCategories && (
          <div className={styles.categories}>
            {topCategories.map((category) => {
              const { type, number } = category
              if (!type || typeof type !== 'object') {
                return null
              }
              const { title } = type
              const pillText = number ? `${title} (${number})` : title
              return (
                <div className={styles.category}>
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
