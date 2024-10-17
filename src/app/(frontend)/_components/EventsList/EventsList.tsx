import { Fragment } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import * as flags from 'country-flag-icons/react/3x2'
import Button from 'src/app/(frontend)/_components/Button'
import { getEventsArchive } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import getDateTimeLocale from 'src/app/(frontend)/_utils/getDateTimeLocale'
import type { TLocales } from 'src/app/(frontend)/_utils/getDateTimeLocale'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'
import Flare from 'src/app/(frontend)/_components/svgs/Flare'
import DiagonalArrowSquare from 'src/app/(frontend)/_components/svgs/DiagonalArrowSquare'
import RightArrow from 'src/app/(frontend)/_components/svgs/RightArrow'
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
                const { buttonType, link } = button || {}
                const FlagComponent = flags[country]
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
                  <p className={styles.location}>
                    <span className={styles.flag}>
                      {FlagComponent && <FlagComponent title={country} className={styles.flag_Icon} />}
                    </span>
                    {location}
                  </p>
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
                    {(buttonType && link) && (
                      <Button
                        className={cx(styles.button, styles[`button__${buttonType}`])}
                        link={link}
                        text={buttonType === 'rsvp' ? 'RSVP' : 'Announcement'}
                        buttonStyle={buttonType === 'rsvp' ? 'pink' : 'secondary'}
                      />
                    )}
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
                          {featured && (
                            <div className={styles.featured}>
                              <Flare className={styles.featured_Logo} />
                              <span className={styles.featured_Label}>Featured Event</span>
                            </div>
                          )}
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
