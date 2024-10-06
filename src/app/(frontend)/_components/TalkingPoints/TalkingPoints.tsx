import cx from 'classnames'
import Image from 'next/image'
import styles from './TalkingPoints.module.scss'

export default function TalkingPoints({ className }: any) {
  const points:{ header: 'header', text: 'text', icon: 'icon here', id: '123' }[] = [
    {
      header: 'header', text: 'text', icon: 'icon here', id: '123',
    },
    {
      header: 'header', text: 'text', icon: 'icon here', id: '123',
    },
    {
      header: 'header', text: 'text', icon: 'icon here', id: '123',
    },
    {
      header: 'header', text: 'text', icon: 'icon here', id: '123',
    },
  ]

  return (
    <section className={cx(styles.talkingPoints, className)}>
      <div className={styles.PointsWrap}>
        {points && points.map((point) => (
          <div className={styles.Point} key={point.id}>
            <div className={styles.PointHeaderWrap}>
              <Image
                src='/foo'
                width={20}
                height={20}
                alt=''
              />
              <div>{point.header}</div>
            </div>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
