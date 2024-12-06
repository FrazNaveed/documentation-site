'use client'

import { useRef, useState, useEffect } from 'react'
import styles from './SecurePanel.module.scss'

export default function SecureVideo({ videoSrc, mobileVideoSrc }: { videoSrc: string; mobileVideoSrc?: string }) {
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
      videoRef.current.load() // Reload video to ensure it reflects the new source
    }
  }, [currentSrc])

  function handleOnMouseEnter() {
    if (!containerRef.current || !videoRef.current) return
    videoRef.current.play()
  }

  function handleOnMouseLeave() {
    if (!containerRef.current || !videoRef.current) return
    videoRef.current.pause()
  }

  return (
    <div
      className={styles.bgVideoWrap}
      ref={containerRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <video ref={videoRef} className={styles.bgVideo} loop muted playsInline>
        <source src={`${currentSrc}_compressed.mov`} type='video/mp4; codecs="hvc1"' />
        <source src={`${currentSrc}.webm`} type='video/webm' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
