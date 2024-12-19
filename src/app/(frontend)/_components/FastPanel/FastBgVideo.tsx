'use client'

import { useRef, useState, useEffect } from 'react'
import styles from './FastPanel.module.scss'

export default function FastVideo({ videoSrc, mobileVideoSrc }: { videoSrc: string; mobileVideoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSrc, setCurrentSrc] = useState(videoSrc)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

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
      videoRef.current.load()
    }
  }, [currentSrc])

  useEffect(() => {
    if (!isTouchDevice || !containerRef.current || !videoRef.current) return

    const options = {
      threshold: 0.4,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play()
        } else {
          videoRef.current?.pause()
        }
      })
    }, options)

    observer.observe(containerRef.current)

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect()
    }
  }, [isTouchDevice])

  function handleOnMouseEnter() {
    if (!containerRef.current || !videoRef.current) return
    videoRef.current.play()
  }

  function handleOnMouseLeave() {
    if (!containerRef.current || !videoRef.current) return
    videoRef.current.pause()
  }

  // Create event handlers object only if not a touch device
  const mouseEvents = !isTouchDevice ? {
    onMouseEnter: handleOnMouseEnter,
    onMouseLeave: handleOnMouseLeave,
  } : {}

  return (
    <div
      className={styles.bgVideoWrap}
      ref={containerRef}
      {...mouseEvents}
    >
      <video ref={videoRef} className={styles.bgVideo} loop muted playsInline preload='auto'>
        <source src={`${currentSrc}_compressed.mov`} type='video/quicktime' />
        <source src={`${currentSrc}.webm`} type='video/webm' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
