'use client'
import React, {useState, useEffect } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import styles from './NewsFilter.module.scss'

export type LinksProps = {
  navLinks: { text: string, link: string, id: number }[]
  className?: string
}

export default function Links({
  navLinks, className }: LinksProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)

  const handleClick = (index: number) => {
    setActiveIndex(index)
    setHasClicked(true)
  }

  return (
    <div className={cx(styles.NewsFilter, className)}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks?.map((navLink, index) => (
            <li
              className={cx(
                styles.filter,
                {[styles.active]: !hasClicked && index === 0 || activeIndex === index},
              )}
              key={navLink.id}
            >
            <Link
              href={index !== 0 ? `/news/type/${navLink.link}` : `/news/`}
              className={styles.text}
              onClick={() => handleClick(index)}
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