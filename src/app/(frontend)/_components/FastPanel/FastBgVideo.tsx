'use client'

import { useRef, useState, useEffect } from 'react'
import styles from './FastPanel.module.scss'

export default function FastVideo({ videoSrc, mobileVideoSrc }: {videoSrc: string, mobileVideoSrc?: string}) {
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
    const observerOptions = {
      root: null, // Use the viewport as the root
      threshold: [0.75, 0.25], // 10% and 90% visibility thresholds
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (videoRef.current) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) { // 75% in view
            videoRef.current.play()
          } else if (entry.intersectionRatio <= 0.25 || entry.boundingClientRect.top > window.innerHeight) { // 75% out
            videoRef.current.pause()
          }
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
    }
  }, [])

  return (
    <div
      className={styles.bgVideoWrap}
      ref={containerRef}
    >
      <video
        ref={videoRef}
        className={styles.bgVideo}
        loop
        muted
        playsInline
      >
        <source src={currentSrc} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
