import cx from 'classnames'
import type { IResponsiveImage, Media } from '@/payload-types'
import styles from './ResponsiveImageBlock.module.scss'

export type ResponsiveImageBlockProps = IResponsiveImage & {
  className?: string
}

export default function ResponsiveImageBlock({
  header, imageDefault, imageMedium, imageMobile, className,
}: ResponsiveImageBlockProps) {
  const getImageMarkup = (imageClassModifer: string, image?: number | Media | null) => (
    (image && typeof image === 'object' && image?.url) ? (
      <div
        className={cx(
          styles.image,
          styles[`image__${imageClassModifer}`],
          {
            [styles[`image__${imageClassModifer}MediumExists`]]: imageMedium && typeof imageMedium === 'object' && imageMedium?.url,
            [styles[`image__${imageClassModifer}MobileExists`]]: imageMobile && typeof imageMobile === 'object' && imageMobile?.url,
          },
        )}
        style={{
          backgroundImage: `url(${image?.url})`,
          aspectRatio: (image.width ?? 1) / (image.height ?? 1),
        }}
      >
        {image.alt && <span className={styles.srOnly}>{image.alt}</span>}
      </div>
    ) : null
  )
  return (
    <section className={cx(styles.grid, className)}>
      <div className={styles.content}>
        {header && <h2 className={styles.title}>{header}</h2>}
        {getImageMarkup('default', imageDefault)}
        {getImageMarkup('medium', imageMedium)}
        {getImageMarkup('mobile', imageMobile)}
      </div>
    </section>
  )
}
