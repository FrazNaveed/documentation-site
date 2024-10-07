import Image from 'next/image'
import cx from 'classnames'
import type { Media } from '@/payload-types'
import Button from '../Button'
import styles from './PageHero.module.scss'

export type PageHeroProps = {
  heroStyle?: 'standard' | 'featuredEvent'
  backgroundImage?: Media
  header?: string | null
  eyebrow?: string | null
  cta?: {
    text: string
    link: string
  }
}

export default function PageHero({
  heroStyle = 'standard',
  backgroundImage,
  header,
  eyebrow,
  cta,
}: PageHeroProps) {
  return (
    <div className={styles.bg}>
      <div
        className={cx(
          styles.container,
          styles.grid,
          styles[`grid__${heroStyle}`],
        )}
      >
        <div className={cx(styles.decoration, styles[`decoration__${heroStyle}`])}>
          {(eyebrow && heroStyle === 'standard' && backgroundImage?.url) && <h1 className={cx(styles.eyebrow, styles.eyebrow__mobile)}>{eyebrow}</h1>}
          {backgroundImage?.url && (
            <div className={cx(styles.bgImgWrap, styles[`bgImgWrap__${heroStyle}`])}>
              <Image
                className={cx(styles.bgImg, styles[`bgImg__${heroStyle}`])}
                src={backgroundImage.url}
                width={backgroundImage.width ?? 0}
                height={backgroundImage.height ?? 0}
                alt={backgroundImage.alt}
                priority
              />
            </div>
          )}
        </div>
        <div className={cx(styles.content, styles[`content__${heroStyle}`], { [styles.content__standardWImage]: heroStyle === 'standard' && backgroundImage?.url })}>
          {eyebrow && <h1 className={cx(styles.eyebrow, { [styles.eyebrow__dt]: heroStyle === 'standard' && backgroundImage?.url })}>{eyebrow}</h1>}
          {header && <p className={styles.header}>{header}</p>}
          {cta && (
            <div className={styles.meta}>
              <Button text={cta.text} link={cta.link} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
