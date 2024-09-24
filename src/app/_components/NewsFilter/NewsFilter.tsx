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
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          {navLinks?.map((navLink, index) => (
            <Link
              href={index !== 0 ? `/news/type/${navLink.link}` : `/news/`}
              className={cx(
                styles.filter,
                {[styles.active]: !hasClicked && index === 0 || activeIndex === index},
              )}
              onClick={() => handleClick(index)}
              key={navLink.id}
            >
              <li className={styles.text}>
                {navLink.text}
              </li>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}