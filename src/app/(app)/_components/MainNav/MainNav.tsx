'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'
import cx from 'classnames'
import useIsBelowBreakpoint from 'src/app/(app)/_hooks/useIsBelowBreakpoint'
import CaretDropdown from '../svgs/CaretDropdown'
import Connector from '../svgs/Connector'
import FAssets from '../svgs/FAssets'
import Flare from '../svgs/Flare'
import Oracle from '../svgs/Oracle'
import styles from './MainNav.module.scss'

export type MainNavigation = {
  title?: string
  subNavSections: {
    _key: string
    title: string
    standout?: boolean
    hasBackground?: boolean
    links: {
      _key: string
      title: string
      url: string
      isExternal?: boolean
      description?: string
      icon?: 'flareLogo' | 'fassets' | 'connector' | 'oracle'
    }[]
  }[]
}[]

export type SecondaryNavigation = {
  _key: string
  title: string
  url: string
}[]

type MainNavProps = {
  navData: MainNavigation
  secondaryNavData: SecondaryNavigation
}

const navIvons = {
  flareLogo: <Flare />,
  fassets: <FAssets />,
  connector: <Connector />,
  oracle: <Oracle />,
}

export default function MainNav({ navData, secondaryNavData }: MainNavProps) {
  const pathname = usePathname()
  const [isBelowBreakpoint] = useIsBelowBreakpoint()
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null)
  const [headerBottomPos, setHeaderBottomPos] = useState<number>(120)
  const [nevLeftPos, setNavLeftPos] = useState<string>('50%')
  const [navWidth, setNavWidth] = useState<string>('100%')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

  const getNavPos = useCallback(() => {
    const navRect = document.getElementById('mainNav')?.getBoundingClientRect()
    if (navRect) {
      const { width, x } = navRect
      setNavLeftPos(`${x}px`)
      setNavWidth(`${width}px`)
    }
  }, [])

  const toggleMobileNav = () => {
    if (!mobileNavIsOpen) {
      getHeaderBottomPos()
    }
    setMobileNavIsOpen((prev) => !prev)
  }

  useEffect(() => {
    getHeaderBottomPos()
    getNavPos()
  }, [getHeaderBottomPos, getNavPos])

  // Check for window width change in resize events to avoid recalculating
  // when resize is fired due to iOS Safari menu going in and out on scroll
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window
      // The window width has changed
      if (innerWidth !== windowWidth) {
        setWindowWidth(innerWidth)
        getHeaderBottomPos()
        getNavPos()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth, getHeaderBottomPos, getNavPos])

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
                          <div
                            key={linkGroup._key}
                            className={cx(
                              styles.linkGroupWrap,
                              {
                                [styles.linkGroupWrap__hasBg]: linkGroup.hasBackground,
                                [styles.linkGroupWrap__standout]: linkGroup.standout,
                              },
                            )}
                          >
                            <ul
                              className={cx(
                                styles.linkGroup,
                                {
                                  [styles.linkGroup__hasBg]: linkGroup.hasBackground,
                                  [styles.linkGroup__standout]: linkGroup.standout,
                                },
                              )}
                              style={{ maxWidth: linkGroup.hasBackground ? `calc(${navWidth} - 30px)` : navWidth }}
                            >
                              {linkGroup.title && (
                                <li className={styles.linkGroupHeader}>
                                  {linkGroup.title}
                                </li>
                              )}
                              {linkGroup.links.map((link) => (
                                <li key={link._key} className={styles.linkGroupItem}>
                                  <Link
                                    href={link.url}
                                    className={cx(
                                      styles.submenuLink,
                                      {
                                        [styles.submenuLink__hasIcon]: link.icon,
                                        [styles.submenuLink__standout]: linkGroup.standout,
                                      },
                                    )}
                                  >
                                    {link.icon && (
                                      <span
                                        className={cx(
                                          styles.submenuLink_Icon,
                                          styles[`submenuLink_Icon__${link.icon}`],
                                          {
                                            [styles.submenuLink_Icon__standout]: linkGroup.standout,
                                          },
                                        )}
                                      >
                                        {navIvons[link.icon]}
                                      </span>
                                    )}
                                    <span className={cx({ [styles.submenuLinkWrap]: link.description })}>
                                      {link.title}
                                      {link.description && (
                                        <span className={styles.submenuLink_Description}>
                                          {link.description}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
          {secondaryNavData?.length && (
            <ul className={styles.secondaryMenu}>
              {secondaryNavData.map((link) => (
                <li key={link._key} className={styles.secondaryMenu_Item}>
                  <Link href={link.url} className={styles.secondaryMenu_Link}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </RemoveScroll>
    </>
  )
}
