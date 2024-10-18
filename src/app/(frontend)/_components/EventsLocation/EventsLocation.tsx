import cx from 'classnames'
import * as flags from 'country-flag-icons/react/3x2'
import type { Event } from '@/payload-types'
import styles from './EventsLocation.module.scss'

export type EventsLocationProps = {
  location: Event['location']
  country: Event['country']
  className?: string
  iconSmall?: boolean
}

export default function EventsLocation({
  location, country, className, iconSmall,
}: EventsLocationProps) {
  const FlagComponent = flags[country]
  return (
    <p className={cx(styles.location, className)}>
      <span className={cx(styles.flag, { [styles.flag__small]: iconSmall })}>
        {FlagComponent && <FlagComponent title={country} className={styles.flag_Icon} />}
      </span>
      {location}
    </p>
  )
}
