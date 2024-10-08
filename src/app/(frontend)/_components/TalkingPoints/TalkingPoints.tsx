import cx from 'classnames'
import Image from 'next/image'
import type { Media, PointsList, ITalkingPoints } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TalkingPoints.module.scss'

export type TalkingPointsProps = ITalkingPoints & {
  points: PointsList
  className?: string
}

export default function TalkingPoints({
  points,
  className,
}: TalkingPointsProps) {
  return (
    <section className={cx(styles.Wrap, className)}>
      <div className={styles.PointsWrap}>
        {points && points.map((point, index) => (
          <div
            key={point.id}
            className={cx(
              styles.Point,
              index % 2 !== 0 ? styles.Point__right : styles.Point__left,
              index === points.length - 1 && styles.Point__noBorderBottom,
              (index % 2 === 0 && index === points.length - 2) && styles.Point__noBorderBottom,
            )}
          >
            <div className={styles.PointHeaderWrap}>
              <Image
                src={(point.icon as Media).url || ''}
                width={20}
                height={20}
                alt=''
                className={styles.PointImage}
              />
              <div className={styles.PointHeader}>{point.header}</div>
            </div>
            {point.text && <LexicalRenderer content={point.text as PayloadLexicalReactRendererContent} />}
          </div>
        ))}
      </div>
    </section>
  )
}
