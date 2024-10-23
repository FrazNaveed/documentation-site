import Link from 'next/link'
import cx from 'classnames'
import EventsHero from 'src/app/(frontend)/_components/EventsHero'
import EventsList from 'src/app/(frontend)/_components/EventsList'
import RightArrow from 'src/app/(frontend)/_components/svgs/RightArrow'
import { getFeaturedEvent } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import styles from './EventsWidget.module.scss'

export default async function EventsWidget() {
  const eventsPageSlug = 'events'
  const featuredEvent = await getFeaturedEvent()
  const eventsPage = await getPageBySlug(eventsPageSlug)
  const eventsPageData = eventsPage[0]
  const { hero } = eventsPageData
  const heroBackgroundImage = hero?.backgroundImage
  const heroBackgroundImageProps = (heroBackgroundImage && typeof heroBackgroundImage === 'object') ? { backgroundImage: heroBackgroundImage } : {}
  const eventsLink = (mobile = false) => (
    <Link
      href={`/${eventsPageSlug}`}
      className={cx(styles.link, { [styles.link__mobile]: mobile, [styles.link__desktop]: !mobile })}
    >
      View All Upcoming Events
      <RightArrow className={styles.link_Icon} />
    </Link>
  )
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.header}>
            Upcoming Events
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
