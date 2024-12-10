import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import RightArrow from '../svgs/RightArrow'
import styles from './ProductGrid.module.scss'

export default function ProductGrid({
  slug, link, icon, titleOverride, title, shortDescription,
}: Product) {
  return (
    <Link href={link || `/${slug}`} className={styles.productWrap}>
      <div className={styles.product}>
        <div className={styles.productHeader}>
          <div className={styles.productInfo}>
            <div className={styles.productIconWrap}>
              {icon && typeof icon === 'object' && icon?.url && icon?.alt && (
              <Image
                src={icon.url}
                alt={icon.alt}
                width={48}
                height={48}
              />
              )}
            </div>
            <h3 className={styles.productTitle}>{titleOverride || title}</h3>
          </div>
          <RightArrow />
        </div>
        <p className={styles.productDescription}>{shortDescription}</p>
      </div>
    </Link>

  )
}
