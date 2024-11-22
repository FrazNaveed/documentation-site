import cx from 'classnames'
import EventsAllLink from 'src/app/(frontend)/_components/EventsAllLink'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import { IEventsWidget } from '@/payload-types'
import styles from './EventsWidget.module.scss'

export type EventsWidgetProps = IEventsWidget & {
  className?: string,
}

export default async function EventsWidget({ titleOverride, className }: EventsWidgetProps) {
  const eventsPageLink = getCollectionPath('events')
  const eventsPageSlug = eventsPageLink.replace(/^\/|\/$/g, '')
  const featuredEvent = await getFeaturedEvent()
  const eventsPage = await getPageBySlug(eventsPageSlug)
  const eventsPageData = eventsPage[0] || {}
  const { hero } = eventsPageData
  const heroBackgroundImage = hero?.backgroundImage
  const heroBackgroundImageProps = (heroBackgroundImage && typeof heroBackgroundImage === 'object') ? { backgroundImage: heroBackgroundImage } : {}
  const eventsLink = (mobile = false) => (
    <EventsAllLink
      className={cx(styles.link, { [styles.link__mobile]: mobile, [styles.link__desktop]: !mobile })}
      iconClassName={styles.link_Icon}
    />
  )
  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.header}>
            {titleOverride || 'Upcoming Events'}
          </h2>
          {eventsLink()}
        </div>
        <div className={styles.content}>
          <div className={cx(styles.eventHero, { [styles.eventHero__artOnly]: !featuredEvent })}>
            <EventsHero event={featuredEvent} {...heroBackgroundImageProps} noDesktopContainerPadding />
          </div>
          <div className={styles.eventList}>
            <EventsList eventListStyle='minimal' />
          </div>
        </div>
        {eventsLink(true)}
      </div>
    </div>
  )
}
