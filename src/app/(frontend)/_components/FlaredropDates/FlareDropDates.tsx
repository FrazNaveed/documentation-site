import cx from 'classnames'
import styles from './FlareDropDates.module.scss'
import { toShortBillion } from '../../_utils/numberFormats'
import dropDateData from './dropDateData.json'
import {
  formatDropDate, getNextDropDate, isDropDateInThePast, getNewYear, calculateAwardTotals,
} from './flareDropDateUtils'

export type FlareDropDatesProps = {
  title?: string,
}

export default function FlareDropDates({
  title = 'FlareDrop Dates',
}: FlareDropDatesProps) {
  const awarded = calculateAwardTotals(dropDateData).awarded * 1000000
  const toBeAwarded = calculateAwardTotals(dropDateData).toAward * 1000000

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.legend}>
        <div className={styles.legendCard}>
          <p className={cx(styles.legendCardHeader, styles.grayKey)}>Awarded to Date</p>
          <h6 className={cx(styles.legendCardStat, styles.flrToken)}>{toShortBillion(awarded)}</h6>
        </div>
        <div className={styles.nextDrop}>
          <p className={styles.legendCardHeader}>Next FlareDrop</p>
          <h6 className={styles.legendCardStat}>{getNextDropDate(dropDateData)}</h6>
        </div>
        <div className={styles.legendCard}>
          <p className={cx(styles.legendCardHeader, styles.pinkKey)}>To be Awarded</p>
          <h6 className={cx(styles.legendCardStat, styles.flrToken)}>{toShortBillion(toBeAwarded)}</h6>
        </div>
      </div>
      <div className={styles.timeline}>
        <div className={styles.timelineMonths}>
          {dropDateData.map((item, index) => (
            <div
              key={item.dropDate}
              className={cx(
                styles.timelineMonth,
                {
                  [styles.past]: isDropDateInThePast(item.dropDate),
                },
              )}
            >
              {getNewYear(dropDateData, index) && (
              <span className={cx(
                styles.timelineYear,
                {
                  [styles.last]: index === dropDateData.length - 1,
                },
              )}
              >
                {getNewYear(dropDateData, index)}
              </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.infoText}>
        <p>Claimable every 30 days UTC. Unclaimed tokens burned after 67 days.</p>
      </div>
      <div className={styles.dropGrid}>
        {dropDateData.map((item) => (
          <div
            key={item.dropDate}
            className={cx(
              styles.dropGridItem,
              {
                [styles.past]: isDropDateInThePast(item.dropDate),
              },
            )}
          >
            <span className={styles.dropGridDate}>{formatDropDate(item.dropDate)}</span>
            <br />
            <span className={styles.dropGridAmount}>
              {item.flr}
              m
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
