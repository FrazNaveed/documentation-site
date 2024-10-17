// import cx from 'classnames'
import Link from 'next/link'
import RightArrow from '../svgs/RightArrow'
import styles from './ProductGrid.module.scss'

export type ProductGridProps = {
  title?: string
  products: any
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className={styles.productGrid}>
      <h2 className={styles.productGridTitle}>{title}</h2>
      <div className={styles.productGridWrap}>
        {products?.map((product: any) => (
          <Link href={product.slug} key={product.id} className={styles.productWrap}>
            <div className={styles.product}>
              <div className={styles.productHeader}>
                <div className={styles.productInfo}>
                  <p>uploaded icon</p>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                </div>
                <RightArrow />
              </div>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
