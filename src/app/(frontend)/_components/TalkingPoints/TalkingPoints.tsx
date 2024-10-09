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
          const {
            id,
            icon,
            header,
            text,
          } = point
          if (!icon && !header && !text) {
            return null
          }
          return (
            <div
              key={id}
              className={cx(
                styles.Point,
                index % 2 !== 0 ? styles.Point__right : styles.Point__left,
                index === points.length - 1 && styles.Point__noBorderBottom,
                (index % 2 === 0 && index === points.length - 2) && styles.Point__noBorderBottom,
              )}
            >
              <div className={styles.PointHeaderWrap}>
                {(icon && typeof icon === 'object' && icon.url) && (
                  <Image
                    src={icon.url}
                    alt={icon.alt}
                    width={50}
                    height={50}
                    className={styles.PointImage}
                  />
                )}
                <div className={styles.PointHeader}>{header}</div>
              </div>
              {text && <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
