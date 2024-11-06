import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { ITalkingPoints } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TalkingPoints.module.scss'
import applyBlockMarginStyles from '../../_utils/applyBlockMarginStyles'

export type TalkingPointsProps = ITalkingPoints & {
  className?: string
}

export default function TalkingPoints({
  points,
  className,
  standardBottomMargin,
  standardTopMargin,
  variation = 'standard',
}: TalkingPointsProps) {
  return (
    <section className={cx(styles.grid, className, applyBlockMarginStyles(standardTopMargin, standardBottomMargin))}>
      <div className={cx(styles.pointsWrap, styles[`pointsWrap__${variation}`])}>
        {points && points.map((point) => {
          const {
            id,
            icon,
            header,
            text,
            addLogos,
            logos,
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
            <div
              key={id}
              className={cx(
                styles.point,
                styles[`point__${variation}`],
                { [styles.point__hasLogos]: addLogos },
              )}
            >
              {iconMarkup(styles.point_Image__iso)}
              <div>
                <div className={cx(styles.point_HeaderWrap, styles[`point_HeaderWrap__${variation}`])}>
                  {iconMarkup(styles.point_Image__header)}
                  <h4 className={styles.point_Header}>{header}</h4>
                </div>
                {text && (
                  <div className={styles.point_Text}>
                    <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />
                  </div>
                )}
                {addLogos && logos && logos.length > 0
                && (
                  <div className={styles.point_LogosWrap}>
                    {logos?.map((card) => {
                      if (typeof card === 'object') {
                        const {
                          id: cardId,
                          link,
                          logo,
                        } = card
                        const imageMarkup = (typeof logo === 'object' && logo?.url) && (
                          <div className={styles.imageWrap}>
                            <Image
                              src={logo.url}
                              alt={logo.alt}
                              width={logo.width ?? 0}
                              height={logo.height ?? 0}
                            />
                          </div>
                        )
                        if (!imageMarkup) {
                          return null
                        }
                        return (
                          link ? (
                            <Link
                              key={cardId}
                              href={link}
                              className={cx(styles.logoCard, cx(styles.logoCard__linked))}
                            >
                              {imageMarkup}
                            </Link>
                          ) : (
                            <div key={cardId} className={styles.logoCard}>
                              {imageMarkup}
                            </div>
                          )
                        )
                      }
                      return null
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
