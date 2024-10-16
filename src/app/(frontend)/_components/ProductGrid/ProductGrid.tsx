// import cx from 'classnames'
import styles from './ProductGrid.module.scss'

export type ProductGridProps = {
  title?: string
}

export default function ProductGrid({ title }: ProductGridProps) {
  return (
    <section className={styles.productGrid}>
      <h2 className={styles.productGridTitle}>{title}</h2>
      <div className={styles.productGridWrap}>
        map products
      </div>
    </section>
  )
}
