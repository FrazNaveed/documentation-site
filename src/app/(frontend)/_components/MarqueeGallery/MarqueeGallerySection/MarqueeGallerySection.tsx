'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from '../MarqueeGallery.module.scss'

export default function MarqueeGallerySection({ children }: React.PropsWithChildren) {
  const contentContainer = useRef<HTMLDivElement | null>(null)
  const [repeatCount, setRepeatCount] = useState(1)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [initialContentWidth, setInitialContentWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Measure initial content width only once when the component mounts
  useEffect(() => {
    if (contentContainer.current && initialContentWidth === 0) {
      const initialWidth = contentContainer.current.offsetWidth
      setInitialContentWidth(initialWidth)
    }
  }, [children, initialContentWidth])

  // Recalculate the number of content repeats based on viewport width and the initial content width
  useEffect(() => {
    if (initialContentWidth > 0) {
      const repeatCountToSet = Math.ceil(viewportWidth / initialContentWidth)
      setRepeatCount(repeatCountToSet)
    }
  }, [viewportWidth, initialContentWidth])

  // Measure actual content width accounting for if countent has been added or removed
  useEffect(() => {
    if (contentContainer.current) {
      // Double width because there are two repeated marquees
      const currentContentWidth = contentContainer.current.offsetWidth * 2
      setContentWidth(currentContentWidth)
    }
  }, [viewportWidth, children, repeatCount])

  // Calculate animation duration based on content width and desired speed
  const calculateAnimationDuration = () => {
    const duration = contentWidth / 100
    return `${duration}s`
  }

  // Convert children to an array and repeat the content accordingly
  const childrenArray = React.Children.toArray(children)

  const marqueeContent: React.ReactNode[] = []
  for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex += 1) {
    childrenArray.forEach((child, index) => {
      // Ensure child is typed as ReactElement
      if (React.isValidElement(child)) {
        marqueeContent.push(React.cloneElement(child, {
          key: `${child.key || index}-${repeatIndex}`, // Unique key for each child in each repeat
        }))
      }
    })
  }

  return (
    <div className={styles.marquee} style={{ animationDuration: calculateAnimationDuration() }}>
      <div className={styles.contentWrap}>
        <div ref={contentContainer} className={styles.content}>
          {marqueeContent}
        </div>
      </div>
    </div>
  )
}
