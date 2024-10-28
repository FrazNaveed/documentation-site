'use client'

import { useEffect, useRef, useState } from 'react'
import * as flags from 'country-flag-icons/react/3x2'
import cx from 'classnames'
import type { FeaturedGrantsCountries as TFeaturedGrantsCountries } from '@/payload-types'
import styles from '../FeaturedGrants.module.scss'

export type FeaturedGrantsCountriesProps = {
  countries: NonNullable<TFeaturedGrantsCountries>
}

export default function FeaturedGrantsCountries({ countries }: FeaturedGrantsCountriesProps) {
  const countriesContainer = useRef<HTMLDivElement | null>(null)
  const flagContainer = useRef<HTMLDivElement | null>(null)
  const extraCountryContainer = useRef<HTMLDivElement | null>(null)
  const [hasUpdated, setHasUpdated] = useState(false)
  const [flagContainerWidth, setFlagContainerWidth] = useState(427)

  const flagWidth = 30
  const flagWidthOverlap = 4

  const updateDimensions = () => {
    if (countriesContainer.current && flagContainer.current && extraCountryContainer.current) {
      const countriesContainerWidth = countriesContainer.current.offsetWidth
      const extraCountryContainerWidth = extraCountryContainer.current.offsetWidth - flagWidthOverlap
      const lefthandElementWidth = (
        flagContainer.current.getBoundingClientRect().left - countriesContainer.current.getBoundingClientRect().left
      )
      const maxFlagContainerWidth = countriesContainerWidth - extraCountryContainerWidth - lefthandElementWidth
      setFlagContainerWidth(maxFlagContainerWidth)
      setHasUpdated(true)
    }
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const flagsThatFitCount = Math.max(
    1,
    Math.floor((flagContainerWidth - flagWidth) / (flagWidth - flagWidthOverlap)) + 1,
  )
  const maxFlagsToShow = 12
  const flagsToShow = Math.min(flagsThatFitCount, maxFlagsToShow)
  const countriesLength = countries.length
  return (
    <div ref={countriesContainer} className={styles.countries}>
      <p className={styles.countryCount}>{countriesLength}</p>
      <div ref={flagContainer} className={styles.flags}>
        {countries.slice(0, flagsToShow).map((countryObj) => {
          const { country, id } = countryObj
          const FlagComponent = flags[country]
          return FlagComponent && (
            <div key={id} className={cx(styles.flag, { [styles.flag__visible]: hasUpdated })}>
              <FlagComponent title={country} className={styles.flag_Icon} />
            </div>
          )
        })}
      </div>
      {(countriesLength as number) > flagsToShow && (
        <div
          ref={extraCountryContainer}
          className={cx(styles.extraCountryCount, { [styles.extraCountryCount__visible]: hasUpdated })}
        >
          {`+${(countriesLength as number) - flagsToShow}`}
        </div>
      )}
    </div>
  )
}
