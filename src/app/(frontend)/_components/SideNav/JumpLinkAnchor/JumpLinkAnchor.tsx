'use client'

import React, { useEffect, useRef, useState } from 'react'

import cx from 'classnames'
import slugifyLinkText from '../utils/slugifyLinkText'
import styles from './JumpLinkAnchor.module.scss'

export type JumpLinkAnchorProps = {
  linkText: string
  className?: string
  jumpAnchorGlobalClass?: string
}

export default function JumpLinkAnchor({ linkText, className, jumpAnchorGlobalClass }: JumpLinkAnchorProps) {
  const [initialActiveStateSet, setInitialActiveStateSet] = useState(false)
  const anchor = useRef(null)
  const linkId = slugifyLinkText(linkText)
  const activeLinkClass = 'active'

  useEffect(() => {
    if (jumpAnchorGlobalClass && !initialActiveStateSet) {
      // Find closest jump anchor that's closest to but also above the middle of the page to set as active
      const allAnchorLinks = Array.from(document.getElementsByClassName(jumpAnchorGlobalClass))
      const middleOfPage = window.innerHeight * 0.4

      let closest = null
      let closestDistance = Infinity

      allAnchorLinks.forEach((anchorLink) => {
        const rect = anchorLink.getBoundingClientRect()
        const linkTop = rect.top

        // Check if the link is above the middle of the page
        if (linkTop < middleOfPage) {
          const distance = middleOfPage - linkTop
          if (distance < closestDistance) {
            closestDistance = distance
            closest = anchorLink.id
          }
        }
      })
      // If no anchors are above the middle of the page, set the first one as the active one
      if (!closest) {
        closest = allAnchorLinks[0]?.id
      }

      document.getElementById(`jump-link-${closest}`)?.classList.add(activeLinkClass)
      setInitialActiveStateSet(true)
    }
  }, [initialActiveStateSet, jumpAnchorGlobalClass])

  useEffect(() => {
    // Use intersection observer for sections to add active class to current nav item
    // and remove active class from its siblings
    const link = document.getElementById(`jump-link-${linkId}`)
    const linkParent = link?.parentElement
    const linkPrevSibling = link?.previousSibling
    let previousY = 0
    const anchorCurrent = anchor.current
    const observer = new IntersectionObserver(([entry]) => {
      const currentY = entry.boundingClientRect.y
      if (currentY < previousY) { // scrolling down
        link?.classList.add(activeLinkClass)
        if (linkParent) {
          Array.from(linkParent.children).forEach((child) => {
            if (child !== link) {
              child.classList.remove(activeLinkClass)
            }
          })
        }
      } else if (currentY > previousY) { // scrolling up
        if (linkPrevSibling) {
          link.classList.remove(activeLinkClass);
          (linkPrevSibling as HTMLElement).classList.add(activeLinkClass)
        }
      }
      previousY = currentY
    }, {
      rootMargin: '-40% 0% -60%',
    })

    if (anchorCurrent) {
      observer.observe(anchorCurrent)
    }

    return () => {
      if (anchorCurrent) {
        observer.unobserve(anchorCurrent)
      }
    }
  }, [linkId])

  return <div ref={anchor} id={linkId} className={cx(styles.jumpLinkAnchor, className)} />
}
