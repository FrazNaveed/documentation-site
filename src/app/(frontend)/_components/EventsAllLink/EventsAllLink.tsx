import Link from 'next/link'
import cx from 'classnames'
import RightArrow from 'src/app/(frontend)/_components/svgs/RightArrow'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import styles from './EventsAllLink.module.scss'

type EventsAllLinkProps = {
  className?: string
  iconClassName?: string
}

export default async function EventsAllLink({ className, iconClassName }: EventsAllLinkProps) {
  const eventsPageLink = getCollectionPath('events')
  return (
    <Link
      href={eventsPageLink}
      className={cx(styles.link, className)}
    >
      View All Upcoming Events
      <RightArrow className={cx(styles.link_Icon, iconClassName)} />
    </Link>
  )
}
