import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import RightArrow from '../svgs/RightArrow'
import styles from './ProductGrid.module.scss'

type ProductGridItemProps = Product & {
  cardStyle?: 'standard' | 'small'
  useSlugForLink?: boolean
}

export default function ProductGridItem({
  slug, link, icon, titleOverride, title, shortDescription, cardStyle = 'standard', useSlugForLink = false,
}: ProductGridItemProps) {
  const cardTitleMarkup = (
    <h3 className={cx(styles.productTitle, styles[`productTitle__${cardStyle}`])}>
      {titleOverride || title}
    </h3>
  )
  const productSlugLink = `/${slug}`
  const productLink = useSlugForLink ? productSlugLink : (link || productSlugLink)
  return (
    <Link href={productLink} className={styles.productWrap}>
      <div className={styles.product}>
        <div className={cx(styles.productHeader, styles[`productHeader__${cardStyle}`])}>
          <div className={styles.productInfo}>
            <div className={styles.productIconWrap}>
              {icon && typeof icon === 'object' && icon?.url && icon?.alt && (
              <Image
                src={icon.url}
                alt={icon.alt}
                width={48}
                height={48}
                className={styles.productIcon}
              />
              )}
            </div>
            {cardStyle === 'small' ? (
              <div className={styles.productTitleArrowWrap}>
                {cardTitleMarkup}
                <RightArrow className={styles.productArrow} />
              </div>
            ) : cardTitleMarkup}
          </div>
          {cardStyle === 'standard' && <RightArrow className={styles.productArrow} />}
        </div>
        <p className={styles.productDescription}>{shortDescription}</p>
      </div>
    </Link>

  )
}
