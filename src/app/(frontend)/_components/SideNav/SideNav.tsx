'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import type { Page } from '@/payload-types'
import slugifyLinkText from './utils/slugifyLinkText'
import styles from './SideNav.module.scss'

export type SideNavProps = {
  components: Page['components']
  jumpLinkAnchorGlobalClass: string
}

export default function SideNav({ components, jumpLinkAnchorGlobalClass }: SideNavProps) {
  const stickyNav = useRef(null)
  const [navIsPinned, setNavIsPinned] = useState(false)
  const [initialActiveStateSet, setInitialActiveStateSet] = useState(false)
  const [activeNavLinkIndex, setActiveNavLinkIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const sideNavLinks = components?.map((component) => (component.createSideNavLink ? component.linkText : null))
    .filter((value) => value !== null && value !== undefined)

  const headerLabelText = 'On this page'
  const activeLinkTopViewportThreshold = 0.3

  const toggleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const closeOpen = () => {
    setIsOpen(false)
  }

  // Observe sticky nav to set class when pinned
  useEffect(() => {
    const stickyNavCurrent = stickyNav.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavIsPinned(entry.intersectionRatio < 1)
      },
      { threshold: [1] },
    )
    if (stickyNavCurrent) {
      observer.observe(stickyNavCurrent)
    }
    return () => {
      if (stickyNavCurrent) {
        observer.unobserve(stickyNavCurrent)
      }
    }
  }, [])

  // Set initial active anchor link on page load
  useEffect(() => {
    if (jumpLinkAnchorGlobalClass && !initialActiveStateSet) {
      // Find closest jump anchor that's closest to but also above the middle of the page to set as active
      const allAnchorLinks = Array.from(document.getElementsByClassName(jumpLinkAnchorGlobalClass))
      const middleOfPage = window.innerHeight * activeLinkTopViewportThreshold

      let closest = 0
      let closestDistance = Infinity

      allAnchorLinks.forEach((anchorLink, index) => {
        const rect = anchorLink.getBoundingClientRect()
        const linkBottom = rect.bottom

        // Check if the link is above the middle of the page
        if (linkBottom <= middleOfPage) {
          const distance = middleOfPage - linkBottom
          if (distance < closestDistance) {
            closestDistance = distance
            closest = index
          }
        }
      })

      setActiveNavLinkIndex(closest)
      setInitialActiveStateSet(true)
    }
  }, [initialActiveStateSet, jumpLinkAnchorGlobalClass])

  useEffect(() => {
    const previousYMap = new Map()

    // Set initial Y values of anchors
    const jumpLinks = Array.from(document.getElementsByClassName(jumpLinkAnchorGlobalClass))
    jumpLinks.forEach((el) => {
      const initialY = el.getBoundingClientRect().y
      previousYMap.set(el, initialY)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
          const currentY = entry.boundingClientRect.y
          const entryIndex = entry.target.dataset.sectionIndex
          if (entryIndex) {
            const previousY = previousYMap.get(entry.target) || 0
            if (currentY > previousY && entry.isIntersecting) { // scrolling up
              setActiveNavLinkIndex(Math.max(0, Number(entryIndex) - 1))
            } else if (currentY < previousY && !entry.isIntersecting) { // scrolling down
              setActiveNavLinkIndex(Number(entryIndex))
            }
            previousYMap.set(entry.target, currentY)
          }
        }
      })
    }, {
      rootMargin: `-${activeLinkTopViewportThreshold * 100}% 0px -${(1 - activeLinkTopViewportThreshold) * 100}%`,
    })

    if (jumpLinks) {
      jumpLinks.forEach((el) => {
        observer.observe(el)
      })
    }

    return () => {
      if (jumpLinks) {
        jumpLinks.forEach((el) => {
          observer.unobserve(el)
        })
      }
    }
  }, [jumpLinkAnchorGlobalClass])

  if (!sideNavLinks || sideNavLinks.length === 0) {
    return null
  }

  return (
    <div ref={stickyNav} className={cx(styles.sideNav, { [styles.sideNav__pinned]: navIsPinned })}>
      <div className={styles.wrap}>
        <p className={cx(styles.header, styles.header__dtOnly)}>{headerLabelText}</p>
        <button
          type='button'
          onClick={toggleOpen}
          className={cx(styles.header, styles.button, { [styles.button__open]: isOpen })}
          data-content={isOpen ? '-' : '+'}
        >
          {headerLabelText}
        </button>
        <ul className={cx(styles.list, { [styles.list__open]: isOpen })}>
          {sideNavLinks.map((linkText, index) => {
            const link = slugifyLinkText(linkText)
            return (
              <li
                key={link}
                id={`jump-link-${link}`}
                className={cx(styles.listItem, { [styles.listItem__active]: index === activeNavLinkIndex })}
              >
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
