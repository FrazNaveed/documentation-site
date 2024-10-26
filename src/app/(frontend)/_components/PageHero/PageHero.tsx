import Image from 'next/image'
import cx from 'classnames'
import type { Grants, Media } from '@/payload-types'
import Button from '../Button'
import FeaturedGrants from '../FeaturedGrants'
import styles from './PageHero.module.scss'

export type PageHeroProps = {
  heroStyle?: 'standard'
  backgroundImage?: Media
  header?: string | null
  eyebrow?: string | null
  cta?: {
    text: string
    link: string
  }
  ctaSecondary?: {
    text: string
    link: string
  }
  grants?: Grants['featuredGrants']
}

export default function PageHero({
  heroStyle = 'standard',
  backgroundImage,
  header,
  eyebrow,
  cta,
  ctaSecondary,
  grants,
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
        <div
          className={cx(
            styles.content,
            styles[`content__${heroStyle}`],
            {
              [styles.content__standardWImage]: heroStyle === 'standard' && backgroundImage?.url,
              [styles.content__hasGrants]: grants,
            },
          )}
        >
          {eyebrow && <h2 className={cx(styles.eyebrow, { [styles.eyebrow__dt]: heroStyle === 'standard' && backgroundImage?.url })}>{eyebrow}</h2>}
          {header && <h1 className={styles.header}>{header}</h1>}
          {(cta || ctaSecondary) && (
            <div className={styles.meta}>
              {cta && <Button text={cta.text} link={cta.link} />}
              {ctaSecondary && <Button text={ctaSecondary.text} link={ctaSecondary.link} buttonStyle='secondary' />}
            </div>
          )}
        </div>
        {grants && (
          <div className={styles.grants}>
            <FeaturedGrants grants={grants} />
          </div>
        )}
      </div>
    </div>
  )
}
