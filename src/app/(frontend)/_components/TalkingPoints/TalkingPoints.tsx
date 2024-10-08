import cx from 'classnames'
import Image from 'next/image'
import type { PointsList, ITalkingPoints } from '@/payload-types'
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
        {points && points.map((point, index) => {
          const IconProps = (point.icon && typeof point.icon === 'object' && point.icon.url)
            ? { src: point.icon.url, alt: point.icon.alt } : { src: '', alt: 'icon' }

          return (
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
                  {...IconProps}
                  width={20}
                  height={20}
                  className={styles.PointImage}
                />
                <div className={styles.PointHeader}>{point.header}</div>
              </div>
              {point.text && <LexicalRenderer content={point.text as PayloadLexicalReactRendererContent} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
