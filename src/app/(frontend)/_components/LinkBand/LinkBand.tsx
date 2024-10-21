import cx from 'classnames'
import Link from 'next/link'
import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import styles from './LinkBand.module.scss'

export default function LinkBand({ title, links }: any) {
  return (
    <section className={styles.linkBand}>
      <div className={styles.linkBandHeaderWrap}>
        <div className={styles.linkBandHeader}>
          <h2 className={styles.linkBandTitle}>{title}</h2>
        </div>
      </div>
      <div className={styles.linkBandLinks}>
        {links.map((link: any, index: number) => (
          <Link
            key={link.id}
            href={link.linkUrl}
            className={cx(
              styles.linkBandLink,
              index === links.length - 1 && styles.linkBandLink__noBorderBottom,
              (index % 2 === 0 && index === links.length - 2) && styles.linkBandLink__noBorderBottom,
            )}
          >
            {link.linkText}
            <DiagonalArrowSquare />
          </Link>
        ))}
      </div>
    </section>
  )
}
