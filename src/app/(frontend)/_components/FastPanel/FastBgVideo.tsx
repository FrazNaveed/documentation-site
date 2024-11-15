'use client'

import { useRef, useState, useEffect } from 'react'
import throttle from 'lodash/throttle'
import styles from './FastPanel.module.scss'

export default function FastVideo({ videoSrc, mobileVideoSrc }: { videoSrc: string; mobileVideoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSrc, setCurrentSrc] = useState(videoSrc)

  const updateVideoSource = () => {
    const isMobile = window.innerWidth < 640
    setCurrentSrc(isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc)
  }

  useEffect(() => {
    updateVideoSource()
    window.addEventListener('resize', updateVideoSource)
    return () => window.removeEventListener('resize', updateVideoSource)
  }, [videoSrc, mobileVideoSrc])

  useEffect(() => {
    if (videoRef.current && currentSrc) {
      videoRef.current.src = currentSrc // Update the video source directly
      videoRef.current.load() // Reload video to ensure it reflects the new source
    }
  }, [currentSrc])

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!containerRef.current || !videoRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom

      const isWithinThreshold = elementTop <= window.innerHeight * 0.2
      const isOutOfViewportBelow = elementBottom < 0

      if (isWithinThreshold && !isOutOfViewportBelow) {
        videoRef.current.play()
      } else if (isOutOfViewportBelow) {
        videoRef.current.pause()
      }
    }, 200) // Throttle to run at most once every 200ms

    const observerOptions = {
      root: null,
      threshold: 0, // Trigger when the element enters or exits the viewport
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Attach the scroll listener when the element enters the viewport
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll() // Run immediately to handle the current position
        } else {
          // Remove the scroll listener when the element exits the viewport
          window.removeEventListener('scroll', handleScroll)
          if (videoRef.current) videoRef.current.pause() // Pause when out of view
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.bgVideoWrap} ref={containerRef}>
      <video ref={videoRef} className={styles.bgVideo} loop muted playsInline>
        <source src={currentSrc} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
