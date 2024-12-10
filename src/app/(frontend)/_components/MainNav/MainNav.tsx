'use client'

import {
  useCallback, useEffect, useRef, useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'
import throttle from 'lodash.throttle'
import cx from 'classnames'
import useIsBelowBreakpoint from 'src/app/(frontend)/_hooks/useIsBelowBreakpoint'
import ExternalLink from '../ExternalLink'
// import SearchButton from './components/SearchButton'
import CaretDropdown from '../svgs/CaretDropdown'
import Connector from '../svgs/Connector'
import FAssets from '../svgs/FAssets'
import Flare from '../svgs/Flare'
import Oracle from '../svgs/Oracle'
import styles from './MainNav.module.scss'

interface NavigationItem {
  _key: string
  title: string
  url: string
}

interface MainNavigationItem extends NavigationItem {
  isExternal?: boolean
  description?: string
  icon?: 'flareLogo' | 'fassets' | 'connector' | 'oracle'
}

export type MainNavigation = {
  title?: string
  subNavSections: {
    _key: string
    title: string
    standout?: boolean
    hasBackground?: boolean
    links: MainNavigationItem[]
  }[]
}[]

export type SecondaryNavigation = NavigationItem[]

type MainNavProps = {
  navData: MainNavigation
  secondaryNavData: SecondaryNavigation
}

const navIcons = {
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
  const [headerBottomPos, setHeaderBottomPos] = useState<number>(125)
  const [navLeftPos, setNavLeftPos] = useState<string>('50%')
  const [navWidth, setNavWidth] = useState<string>('100%')
  const [windowWidth, setWindowWidth] = useState<number | null>(null)
  const [siteHeaderHidden, setSiteHeaderHidden] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerHiddenClassName = 'siteHeader__flownAway'
  const bodyHiddenClassName = 'siteHeaderHidden'
  const siteHeaderId = 'siteHeader'
  const mainNavId = 'mainNav'

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
    const headerRect = document.getElementById(siteHeaderId)?.getBoundingClientRect()
    if (headerRect) {
      const { height } = headerRect
      setHeaderBottomPos(height)
    }
  }, [])

  const getNavPos = useCallback(() => {
    const navRect = document.getElementById(mainNavId)?.getBoundingClientRect()
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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      if (openSubmenuIndex !== null) {
        setOpenSubmenuIndex(null)
        return
      }

      if (mobileNavIsOpen) {
        setMobileNavIsOpen(false)

        if (buttonRef.current) {
          buttonRef.current.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openSubmenuIndex, mobileNavIsOpen])

  // Close desktop submenus when clicking outside nav
  useEffect(() => {
    const wrapper = document.getElementById(mainNavId)
    const closeSubMenuWhenClickOutsideNav = (e: MouseEvent) => {
      if (!isBelowBreakpoint && openSubmenuIndex !== null && !wrapper?.contains(e.target as Node)) {
        setOpenSubmenuIndex(null)
      }
    }
    window.addEventListener('click', closeSubMenuWhenClickOutsideNav)
    return () => window.removeEventListener('click', closeSubMenuWhenClickOutsideNav)
  }, [isBelowBreakpoint, openSubmenuIndex])

  // Hide site header on scroll down and reveal on scroll up
  useEffect(() => {
    const siteHeader = document.getElementById(siteHeaderId)
    let prevScroll = window.scrollY
    const toggleHeaderVisibilityOnScroll = throttle(() => {
      if (prevScroll > window.scrollY || window.scrollY === 0) {
        if (siteHeaderHidden) {
          // Showing site header
          setSiteHeaderHidden(false)
          siteHeader?.classList.remove(headerHiddenClassName)
          document.body.classList.remove(bodyHiddenClassName)
        }
      } else if (prevScroll < window.scrollY) {
        if (!siteHeaderHidden) {
          // Hiding site header
          setSiteHeaderHidden(true)
          siteHeader?.classList.add(headerHiddenClassName)
          document.body.classList.add(bodyHiddenClassName)
        }
      }
      prevScroll = window.scrollY
    }, 200)
    if (siteHeader) {
      window.addEventListener('scroll', toggleHeaderVisibilityOnScroll)
    }

    return () => window.removeEventListener('scroll', toggleHeaderVisibilityOnScroll)
  }, [siteHeaderHidden])

  return (
    <>
      <span className={styles.buttonsWrap}>
        {/* <SearchButton className={styles.searchButton__hideDesktop} /> */}
        <button
          ref={buttonRef}
          className={cx(styles.mobileToggle, { [styles.mobileToggle__open]: mobileNavIsOpen })}
          onClick={toggleMobileNav}
          type='button'
          aria-label='Toggle main navigation'
          aria-controls={mainNavId}
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
      </span>
      <RemoveScroll
        forwardProps
        enabled={
          (mobileNavIsOpen && isBelowBreakpoint)
          || (openSubmenuIndex !== null && !isBelowBreakpoint)
        }
      >
        <nav
          className={cx(styles.nav, { [styles.nav__mobileOpen]: mobileNavIsOpen, [styles.nav__isMobile]: isBelowBreakpoint }, 'scroll')}
          id={mainNavId}
          aria-label='Main menu'
          style={{ top: `${headerBottomPos}px` }}
        >
          {navData && (
            <>
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
                        style={{ top: `${headerBottomPos}px`, left: navLeftPos }}
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
                                {linkGroup.links.map((link) => {
                                  const { description, icon, isExternal } = link
                                  const LinkComponent = isExternal ? ExternalLink : Link
                                  return (
                                    <li key={link._key} className={styles.linkGroupItem}>
                                      <LinkComponent
                                        href={link.url}
                                        className={cx(
                                          styles.submenuLink,
                                          {
                                            [styles.submenuLink__hasIcon]: icon,
                                            [styles.submenuLink__standout]: linkGroup.standout,
                                          },
                                        )}
                                        {...(isExternal ? { iconClassName: styles.submenuLink_ExternalIcon } : {})}
                                      >
                                        {icon && (
                                          <span
                                            className={cx(
                                              styles.submenuLink_Icon,
                                              styles[`submenuLink_Icon__${icon}`],
                                              {
                                                [styles.submenuLink_Icon__standout]: linkGroup.standout,
                                              },
                                            )}
                                          >
                                            {navIcons[icon]}
                                          </span>
                                        )}
                                        <span className={cx({ [styles.submenuLinkWrap]: description })}>
                                          {link.title}
                                          {description && (
                                            <span className={styles.submenuLink_Description}>
                                              {description}
                                            </span>
                                          )}
                                        </span>
                                      </LinkComponent>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              {/* <SearchButton className={styles.searchButton__hideMobile} /> */}
            </>
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
