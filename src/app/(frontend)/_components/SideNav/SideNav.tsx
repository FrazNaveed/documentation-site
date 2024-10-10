'use client'

import { useState } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import type { Page } from '@/payload-types'
import slugifyLinkText from './utils/slugifyLinkText'
import styles from './SideNav.module.scss'

export type SideNavProps = {
  components: Page['components']
}

export default function SideNav({ components }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sideNavLinks = components?.map((component) => (component.createSideNavLink ? component.linkText : null))
    .filter((value) => value !== null && value !== undefined)
  if (!sideNavLinks || sideNavLinks.length === 0) {
    return null
  }
  const headerLabelText = 'On this page'
  const toggleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const closeOpen = () => {
    setIsOpen(false)
  }
  return (
    <div className={styles.sideNav}>
      <div className={styles.wrap}>
        <p className={cx(styles.header, styles.header__dtOnly)}>{headerLabelText}</p>
        <button
          type='button'
          onClick={toggleOpen}
          className={cx(styles.header, styles.button)}
          data-content={isOpen ? '-' : '+'}
        >
          {headerLabelText}
        </button>
        <ul className={cx(styles.list, { [styles.list__open]: isOpen })}>
          {sideNavLinks.map((linkText) => {
            const link = slugifyLinkText(linkText)
            return (
              <li key={link} id={`jump-link-${link}`} className={styles.listItem}>
                <Link onClick={closeOpen} href={`#${link}`} className={styles.link}>
                  {linkText}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
