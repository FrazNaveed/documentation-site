import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { IBrandLogoRoll } from '@/payload-types'
import styles from './BrandLogoRollBlock.module.scss'

export type BrandLogoRollBlockProps = IBrandLogoRoll & {
  className?: string
}

export default function BrandLogoRollBlock({
  header, logos, alignLeft, className,
}: BrandLogoRollBlockProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      {header && <h2 className={styles.header}>{header}</h2>}
      <div className={cx(styles.logoWrap, { [styles.logoWrap__alignLeft]: alignLeft })}>
        {logos?.map((logo) => {
          const { id, image, link } = logo
          const imageComponent = (
            image && typeof image === 'object' && image.url && (
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width ?? 0}
                height={image.height ?? 0}
              />
            )
          )
          return (
            link ? (
              <Link
                key={id}
                href={link}
                className={cx(styles.logo, styles.logo__linked)}
              >
                {imageComponent}
              </Link>
            ) : (
              <div key={id} className={styles.logo}>
                {imageComponent}
              </div>
            )
          )
        })}
      </div>
    </section>
  )
}
