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
    <section className={cx(styles.Wrap, className)}>
      <div className={styles.PointsWrap}>
        {points && points.map((point, index) => (
          <div
            key={point.id}
            className={cx(
              styles.Point,
              index % 2 !== 0 ? styles.Point__right : styles.Point__left,
            )}
          >
            <div className={styles.PointHeaderWrap}>
              <Image
                src='/foo'
                width={20}
                height={20}
                alt=''
                className={styles.PointImage}
              />
              <div className={styles.PointHeader}>{point.header}</div>
            </div>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
