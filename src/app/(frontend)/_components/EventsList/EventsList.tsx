import { Fragment } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import EventsButton from 'src/app/(frontend)/_components/EventsButton'
import EventsFeaturedLabel from 'src/app/(frontend)/_components/EventsFeaturedLabel'
import EventsLocation from 'src/app/(frontend)/_components/EventsLocation'
import { getEventsArchive } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import convertTimestampToMilitaryTime from 'src/app/(frontend)/_utils/convertTimestampToMilitaryTime'
import getDateTimeLocale from 'src/app/(frontend)/_utils/getDateTimeLocale'
import type { TLocales } from 'src/app/(frontend)/_utils/getDateTimeLocale'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'
import DiagonalArrowSquare from 'src/app/(frontend)/_components/svgs/DiagonalArrowSquare'
import RightArrow from 'src/app/(frontend)/_components/svgs/RightArrow'
import styles from './EventsList.module.scss'

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
    <div className={styles.wrap}>
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
                  endTime,
                  country,
                  location,
                  flareInvolvement,
                  eventLink,
                  button,
                  featured,
                } = event
                const titleMarkup = (
                  <h3 className={styles.title}>
                    {title}
                  </h3>
                )
                const dateMarkup = (
                  <p className={styles.dates}>
                    {displayDateRange(startDate, endDate)}
                    {startTime && `, ${convertTimestampToMilitaryTime(startTime)}`}
                    {(startTime && endTime) && ` - ${convertTimestampToMilitaryTime(endTime)}`}
                  </p>
                )
                const locationMarkup = (
                  <EventsLocation location={location} country={country} className={styles.location} />
                )
                const involvementMarkup = (
                  <p className={styles.involvement}>
                    {flareInvolvement}
                  </p>
                )
                const ArrowComponent = isUrlExternal(eventLink) ? DiagonalArrowSquare : RightArrow
                const linkArrowComponent = eventLink && (
                  <Link href={eventLink} aria-label='Event link'>
                    <ArrowComponent className={styles.arrow} />
                  </Link>
                )
                const buttonMarkup = (showArrow = false) => (
                  <div className={styles.buttonWrap}>
                    <EventsButton button={button} className={styles.button} />
                    {showArrow && linkArrowComponent}
                  </div>
                )
                return (
                  <Fragment key={`${title}-${startDate}-${location}`}>
                    <div className={cx(styles.event, styles.event__desktop)}>
                      <div className={styles.eventInfo}>
                        {titleMarkup}
                        {dateMarkup}
                        {locationMarkup}
                        {involvementMarkup}
                      </div>
                      {buttonMarkup(true)}
                    </div>
                    <div className={cx(styles.event, styles.event__mobile)}>
                      <div className={styles.mobileHeader}>
                        <div className={styles.mobileHeaderText}>
                          {featured && <EventsFeaturedLabel />}
                          {titleMarkup}
                          {dateMarkup}
                        </div>
                        {linkArrowComponent}
                      </div>
                      <div className={styles.eventInner}>
                        <div className={styles.eventInfo}>
                          {locationMarkup}
                          {involvementMarkup}
                        </div>
                        {buttonMarkup()}
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
