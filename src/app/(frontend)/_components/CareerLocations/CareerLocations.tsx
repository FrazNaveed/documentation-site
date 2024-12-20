import cx from 'classnames'
import styles from './CareerLocations.module.scss'

type CareerLocationsProps = {
  locations: {
    Remote?: boolean
    Europe?: boolean
    Asia?: boolean
    Americas?: boolean
  }
  size?: 'small'
}

export default function CareersLocations({ locations, size }: CareerLocationsProps) {
  return (
    <div className={styles.locationsWrap}>
      {Object.entries(locations)
        .filter(([, value]) => value === true)
        .map(([key], index, array) => (
          <span
            key={key}
            className={cx(styles.location, size && styles[`location__${size}`])}
          >
            {`${key}${index === array.length - 1 ? '' : ' / '}`}
          </span>
        ))}
    </div>
  )
}
