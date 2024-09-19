'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'
import debounce from 'lodash.debounce'
import cx from 'classnames'
import useIsBelowBreakpoint from 'src/app/(app)/_hooks/useIsBelowBreakpoint'
import CaretDropdown from '../svgs/CaretDropdown'
import styles from './MainNav.module.scss'

export type MainNavigation = {
  title?: string
  subNavSections: {
    _key: string
    title: string
    hasBackground?: boolean
    links: {
      _key: string
      title: string
      url: string
      isExternal?: boolean
      description?: string
      standout?: boolean
      icon?: 'flareLogo' | 'fassets' | 'connector' | 'oracle'
    }[]
  }[]
}[]

export default function MainNav({ navData }: { navData: MainNavigation }) {
  const pathname = usePathname()
  const [isBelowBreakpoint] = useIsBelowBreakpoint()
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null)
  const [headerBottomPos, setHeaderBottomPos] = useState<number>(120)
  const [nevLeftPos, setNavLeftPos] = useState<string>('50%')

  useEffect(() => {
    setOpenSubmenuIndex(null)
    setMobileNavIsOpen(false)
  }, [pathname])

  const toggleSubmenuOpen = (index: number) => {
    setOpenSubmenuIndex((prev) => {
      if (prev === index) {
        return null
      }
      return index
    })
  }

  const getHeaderBottomPos = useCallback(() => {
    const headerRect = document.getElementById('siteHeader')?.getBoundingClientRect()
    if (headerRect) {
      const { y, height } = headerRect
      setHeaderBottomPos(y + height)
    }
  }, [])

  const getNavLeftPos = useCallback(() => {
    const headerRect = document.getElementById('mainNav')?.getBoundingClientRect()
    if (headerRect) {
      const { x } = headerRect
      setNavLeftPos(`${x}px`)
    }
  }, [])

  const toggleMobileNav = () => {
    if (!mobileNavIsOpen) {
      getHeaderBottomPos()
    }
    setMobileNavIsOpen((prev) => !prev)
  }

  // Update headerBottomPos on window resize in case user widens to desktop nav, scrolls, then narrows to mobile nav
  useEffect(() => {
    const getHeaderBottomPosDebounced = debounce(getHeaderBottomPos, 400)
    window.addEventListener('resize', getHeaderBottomPosDebounced)
    getNavLeftPos()
    window.addEventListener('resize', getNavLeftPos)
    return () => {
      window.removeEventListener('resize', getHeaderBottomPosDebounced)
      window.removeEventListener('resize', getNavLeftPos)
    }
  }, [getHeaderBottomPos, getNavLeftPos])

  return (
    <>
      <button
        className={cx(styles.mobileToggle, { [styles.mobileToggle__open]: mobileNavIsOpen })}
        onClick={toggleMobileNav}
        type='button'
        aria-label='Toggle main navigation'
        aria-controls='mainNav'
        aria-expanded={mobileNavIsOpen}
      >
        <span className={styles.mobileToggle_Bars}>
          <span className={cx(styles.mobileToggle_Bar, { [styles.mobileToggle_Bar__open]: mobileNavIsOpen })} />
          <span className={cx(styles.mobileToggle_Bar, { [styles.mobileToggle_Bar__open]: mobileNavIsOpen })} />
          <span className={cx(styles.mobileToggle_Bar, { [styles.mobileToggle_Bar__open]: mobileNavIsOpen })} />
        </span>
        <span className={cx(styles.mobileToggle_Close, { [styles.mobileToggle_Close__open]: mobileNavIsOpen })}>
          Close
        </span>
      </button>
      <RemoveScroll forwardProps enabled={(mobileNavIsOpen && isBelowBreakpoint) || openSubmenuIndex !== null}>
        <nav
          className={cx(styles.nav, { [styles.nav__mobileOpen]: mobileNavIsOpen, [styles.nav__isMobile]: isBelowBreakpoint }, 'scroll')}
          id='mainNav'
          aria-label='Main menu'
          style={{ top: `${headerBottomPos}px` }}
        >
          {navData && (
            <ul className={styles.navList}>
              {navData?.map((section, sectionIndex) => {
                const {
                  title: sectionTitle,
                  subNavSections,
                } = section
                return (
                  <li
                    key={sectionTitle}
                    className={cx(
                      styles.menuItem,
                      { [styles.menuItem__open]: openSubmenuIndex === sectionIndex },
                    )}
                  >
                    <button
                      type='button'
                      className={cx(
                        styles.menuItem_TopLevelMenuItem,
                        { [styles.menuItem_TopLevelMenuItem__open]: openSubmenuIndex === sectionIndex },
                      )}
                      onClick={() => toggleSubmenuOpen(sectionIndex)}
                      aria-expanded={openSubmenuIndex === sectionIndex}
                      aria-controls={`submenu-${sectionIndex}`}
                    >
                      {sectionTitle}
                      <span
                        className={cx(
                          styles.menuItem_TopLevelMenuItemArrow,
                          { [styles.menuItem_TopLevelMenuItemArrow__open]: openSubmenuIndex === sectionIndex },
                        )}
                      >
                        <CaretDropdown />
                      </span>
                    </button>
                    <div
                      id={`submenu-${sectionIndex}`}
                      className={cx(
                        styles.submenu,
                        {
                          [styles.submenu__open]: openSubmenuIndex === sectionIndex,
                        },
                      )}
                      style={{ top: `${headerBottomPos}px`, left: nevLeftPos }}
                    >
                      <div className={styles.submenus}>
                        {subNavSections.map((linkGroup) => (
                          <ul
                            key={linkGroup._key}
                            className={cx(
                              styles.linkGroup,
                              {
                                [styles.linkGroup__hasBg]: linkGroup.hasBackground,
                              },
                            )}
                          >
                            {linkGroup.title && (
                              <li className={styles.linkGroupHeader}>
                                {linkGroup.title}
                              </li>
                            )}
                            {linkGroup.links.map((link) => (
                              <li key={link._key} className={styles.linkGroupItem}>
                                <Link href={link.url} className={styles.submenuLink}>
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </nav>
      </RemoveScroll>
    </>
  )
}
