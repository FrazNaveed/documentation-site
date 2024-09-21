import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import styles from './NewsFilter.module.scss'

export type LinksProps = {
  navLinks: { text: string, link: string, id: number }[]
  className?: string
}

export default function Links({
  navLinks, className }: LinksProps) {
  return (
    <div className={cx(styles.NewsFilter)}>
      <div className={cx(styles.wrap)}>
        <nav>
          {navLinks?.map((navLink, index) => (
            <Link href={`/news/${navLink.link}`} className={cx(styles.filter)}>
              <li key={navLink.id} className={cx(styles.text)}>
                {navLink.text}
              </li>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}