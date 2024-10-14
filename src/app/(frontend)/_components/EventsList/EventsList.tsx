import cx from 'classnames'
import * as flags from 'country-flag-icons/react/3x2'
import Button from 'src/app/(frontend)/_components/Button'
import { getEventsArchive } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import getDateTimeLocale from 'src/app/(frontend)/_utils/getDateTimeLocale'
import type { TLocales } from 'src/app/(frontend)/_utils/getDateTimeLocale'
import styles from './EventsList.module.scss'

function convertTimestampToMilitaryTime(timestamp: string) {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function displayDateRange(startDate: string, endDate: string | null | undefined = startDate, locale: TLocales = 'en') {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : start
  const localeString = getDateTimeLocale(locale)

  const startMonth = start.toLocaleString(localeString, { month: 'short' })
  const startDay = start.getDate()
  const startYear = start.getFullYear()
  const endMonth = end.toLocaleString(localeString, { month: 'short' })
  const endDay = end.getDate()
  const endYear = end.getFullYear()

  let output
  if (startYear === endYear) {
    if (startMonth === endMonth && startDay === endDay) {
      output = `${startMonth} ${startDay}, ${startYear}`
    } else if (startMonth === endMonth) {
      output = `${startMonth} ${startDay} - ${endDay}, ${startYear}`
    } else {
      output = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`
    }
  } else {
    output = `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
  }

  return output
}

export default async function EventsList() {
  const eventsData = await getEventsArchive()
  const events = eventsData.docs
  const upcomingEventsExist = events.length > 0
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        {upcomingEventsExist ? 'All Upcoming Events' : 'No Upcoming Events'}
      </h2>
      {upcomingEventsExist && (
        <>
          <div className={styles.colHeaders}>
            <p className={styles.colHeader}>Event</p>
            <p className={styles.colHeader}>Date</p>
            <p className={styles.colHeader}>Location</p>
            <p className={styles.colHeader}>Flare Involvement</p>
          </div>
          <div className={styles.grid}>
            {events.map((event) => {
              const {
                title,
                startDate,
                startTime,
                endDate,
                country,
                location,
                flareInvolvement,
                button,
              } = event
              const { buttonType, link } = button || {}
              const FlagComponent = flags[country]
              return (
                <div key={`${title}-${startDate}-${location}`} className={styles.event}>
                  <h3 className={styles.title}>
                    {title}
                  </h3>
                  <p className={styles.dates}>
                    {displayDateRange(startDate, endDate)}
                    {startTime && `, ${convertTimestampToMilitaryTime(startTime)}`}
                  </p>
                  <p className={styles.location}>
                    <span className={styles.flag}>
                      <FlagComponent title={country} className={styles.flag_Icon} />
                    </span>
                    {location}
                  </p>
                  <p className={styles.involvement}>
                    {flareInvolvement}
                  </p>
                  <div className={styles.buttonWrap}>
                    {(buttonType && link) && (
                      <Button
                        className={cx(styles.button, styles[`button__${buttonType}`])}
                        link={link}
                        linkExternal
                        text={buttonType === 'rsvp' ? 'RSVP' : 'Announcement'}
                        buttonStyle={buttonType === 'rsvp' ? 'pink' : 'secondary'}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
