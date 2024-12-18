import cx from 'classnames'
import Link from 'next/link'
import type { LinkBandLinks } from 'payload-types'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'
import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import RightArrow from '../svgs/RightArrow'
import styles from './LinkBand.module.scss'

export type LinkBandProps = {
  title?: string | null,
  links?: LinkBandLinks
}

export default function LinkBand({ title, links }: LinkBandProps) {
  return (
    <section className={styles.linkBand}>
      <div className={styles.linkBandHeaderWrap}>
        <div className={styles.linkBandHeader}>
          <h2 className={styles.linkBandTitle}>{title || 'Explorers & Resources'}</h2>
        </div>
      </div>
      <div className={styles.linkBandLinks}>
        {links?.map((link, index: number) => (
          link?.linkText && link?.linkUrl && (
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
            {isUrlExternal(link.linkUrl) ? <DiagonalArrowSquare /> : <RightArrow />}
          </Link>
          )))}
      </div>
    </section>
  )
}
