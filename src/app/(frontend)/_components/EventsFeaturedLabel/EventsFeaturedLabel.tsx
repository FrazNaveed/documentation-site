import cx from 'classnames'
import Flare from 'src/app/(frontend)/_components/svgs/Flare'
import styles from './EventsFeaturedLabel.module.scss'

export type EventsFeaturedLabelProps = {
  textClassName?: string
}

export default function EventsFeaturedLabel({ textClassName }: EventsFeaturedLabelProps) {
  return (
    <div className={styles.featured}>
      <Flare className={styles.featured_Logo} />
      <span className={cx(styles.featured_Label, textClassName)}>Featured Event</span>
    </div>
  )
}
