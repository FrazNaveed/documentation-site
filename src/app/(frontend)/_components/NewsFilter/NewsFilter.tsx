import Link from 'next/link'
import cx from 'classnames'
import getCollectionPath from '../../_utils/getCollectionPath'
import styles from './NewsFilter.module.scss'

export type LinksProps = {
  navLinks: { text: string, link: string, id: number }[]
  currentType?: string | null
  className?: string
}

export default function Links({ navLinks, currentType, className }: LinksProps) {
  return (
    <div className={cx(styles.NewsFilter, className)}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks?.map((navLink, index) => (
            <li
              className={cx(
                styles.filter,
                { [styles.active]: currentType === navLink.link || (!currentType && index === 0) },
              )}
              key={navLink.id}
            >
              <Link
                href={index !== 0 ? `${getCollectionPath('news-types')}/${navLink.link}` : getCollectionPath('news')}
                className={styles.text}
                title={navLink.text}
              >
                {navLink.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
