import cx from 'classnames'
import Image from 'next/image'
import type { ITalkingPoints } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TalkingPoints.module.scss'

export type TalkingPointsProps = ITalkingPoints & {
  className?: string
}

export default function TalkingPoints({
  points,
  className,
  variation = 'standard',
}: TalkingPointsProps) {
  return (
    <section className={cx(styles.grid, className)}>
      <div className={cx(styles.pointsWrap, styles[`pointsWrap__${variation}`])}>
        {points && points.map((point) => {
          const {
            id,
            icon,
            header,
            text,
          } = point
          if (!icon && !header && !text) {
            return null
          }
          const iconMarkup = (iconClassName: string) => (icon && typeof icon === 'object' && icon.url) && (
            <Image
              src={icon.url}
              alt={icon.alt}
              width={icon.width ?? 0}
              height={icon.height ?? 0}
              className={cx(styles.point_Image, styles[`point_Image__${variation}`], iconClassName)}
            />
          )
          return (
            <div key={id} className={cx(styles.point, styles[`point__${variation}`])}>
              {iconMarkup(styles.point_Image__iso)}
              <div>
                <div className={cx(styles.point_HeaderWrap, styles[`point_HeaderWrap__${variation}`])}>
                  {iconMarkup(styles.point_Image__header)}
                  <h4 className={styles.point_Header}>{header}</h4>
                </div>
                {text && <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
