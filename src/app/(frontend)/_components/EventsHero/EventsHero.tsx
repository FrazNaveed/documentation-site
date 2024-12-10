import Image from 'next/image'
import cx from 'classnames'
import EventsButton from 'src/app/(frontend)/_components/EventsButton'
import EventsFeaturedLabel from 'src/app/(frontend)/_components/EventsFeaturedLabel'
import EventsLocation from 'src/app/(frontend)/_components/EventsLocation'
import type { Event, Media } from '@/payload-types'
import convertTimestampToMilitaryTime from 'src/app/(frontend)/_utils/convertTimestampToMilitaryTime'
import getDateTimeLocale from 'src/app/(frontend)/_utils/getDateTimeLocale'
import type { TLocales } from 'src/app/(frontend)/_types/locales'
import styles from './EventsHero.module.scss'

export type EventsHeroProps = {
  event?: Event | null
  backgroundImage?: Media
  noDesktopContainerPadding?: boolean
}

function displayDayRange(startDate: string, endDate: string | null | undefined = startDate, locale: TLocales = 'en') {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : start
  const localeString = getDateTimeLocale(locale)

  const startMonth = start.toLocaleString(localeString, { month: 'short' })
  const startDay = start.getDate()
  const endMonth = end.toLocaleString(localeString, { month: 'short' })
  const endDay = end.getDate()

  let output
  if (startMonth === endMonth && startDay === endDay) {
    output = `${startMonth} ${startDay}`
  } else if (startMonth === endMonth) {
    output = `${startMonth} ${startDay} - ${endDay}`
  } else {
    output = `${startMonth} ${startDay} - ${endMonth} ${endDay}`
  }

  return output
}

export default function EventsHero({ event, backgroundImage, noDesktopContainerPadding }: EventsHeroProps) {
  let eventContent
  if (event) {
    const {
      title: header,
      startDate,
      startTime,
      endDate,
      country,
      location,
      flareInvolvement: eyebrowDefault,
      featuredHeroEyebrow: eyebrowOverride,
      button,
    } = event
    const eyebrow = eyebrowOverride || eyebrowDefault
    const startYear = startDate && new Date(startDate).getFullYear()
    const endYear = endDate && new Date(endDate).getFullYear()
    eventContent = (
      <div className={styles.content}>
        <EventsFeaturedLabel textClassName={styles.featuredText} />
        {eyebrow && <h2 className={styles.eyebrow}>{eyebrow}</h2>}
        {header && <h1 className={styles.header}>{header}</h1>}
        <p className={styles.date}>
          {displayDayRange(startDate, endDate)}
          {startTime && ` / ${convertTimestampToMilitaryTime(startTime)}`}
          {startYear && ` / ${startYear}`}
          {(endYear && endYear !== startYear) && ` - ${endYear}`}
        </p>
        <EventsLocation location={location} country={country} className={styles.location} iconSmall />
        {button?.link && (
          <div className={styles.meta}>
            <EventsButton button={button} className={styles.button} />
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={cx(styles.bg, { [styles.bg__artOnly]: !event })}>
      <div
        className={cx(
          styles.container,
          styles.grid,
          {
            [styles.container__noDtContainerPadding]: noDesktopContainerPadding,
            [styles.container__artOnly]: !event,
          },
        )}
      >
        {eventContent}
        <div className={cx(styles.decoration, { [styles.decoration__artOnly]: !event })}>
          {backgroundImage?.url && (
            <div className={styles.bgImgWrap}>
              <Image
                className={cx(styles.bgImg, { [styles.bgImg__artOnly]: !event })}
                src={backgroundImage.url}
                width={backgroundImage.width ?? 0}
                height={backgroundImage.height ?? 0}
                alt={backgroundImage.alt}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
