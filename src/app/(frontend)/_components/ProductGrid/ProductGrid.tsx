import type { Product } from '@/payload-types'
import ProductGridItem from './ProductGridItem'
import styles from './ProductGrid.module.scss'

export type ProductGridProps = {
  title?: string
  products: Product[]
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className={styles.productGrid}>
      <h2 className={styles.productGridTitle}>{title}</h2>
      <div className={styles.productGridWrap}>
        {products?.map((product: Product) => <ProductGridItem key={product.id} {...product} />)}
      </div>
    </section>
  )
}
