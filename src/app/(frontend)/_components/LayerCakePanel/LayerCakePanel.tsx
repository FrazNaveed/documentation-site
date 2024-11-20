'use client'

import { useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import styles from './LayerCakePanel.module.scss'
import top from './layers/top.png'
import middle from './layers/middle.png'
import bottom from './layers/bottom.png'
import FlareMarkOnly from '../svgs/FlareMarkOnly'

export default function LayerCakePanel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: [0, 0.75],
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.75 && entry.isIntersecting) {
          setIsAnimating(true)
        } else if (entry.intersectionRatio === 0 && !entry.isIntersecting) {
          setIsAnimating(false)
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
    <section className={styles.wrap} ref={containerRef}>
      <header className={styles.banner}>Flare Network</header>
      <div className={styles.logoWrap}>
        <FlareMarkOnly />
      </div>
      <aside className={styles.column__primary}>
        <h3 className={styles.label}>Foundational technology</h3>
        <div className={cx(styles.textLayers, { [styles.animate]: isAnimating })}>
          <div className={cx(styles.textLayer, styles.textLayer__top)}>
            <h4 className={styles.primaryHeader}>Enshrined Data Protocols</h4>
            <p className={styles.primaryText}>
              Flare’s protocols are integrated into the blockchain&rsquo;s core,
              and inherit the economic security of the entire network
            </p>
          </div>
          <div className={cx(styles.textLayer, styles.textLayer__middle)}>
            <h4 className={styles.primaryHeader}>Ethereum Virtual Machine</h4>
            <p className={styles.primaryText}>
              Flare is EVM compatible with out-of-the-box support for all your favorite tooling
            </p>
          </div>
          <div className={cx(styles.textLayer, styles.textLayer__bottom)}>
            <h4 className={styles.primaryHeader}>Flare Stake</h4>
            <p className={styles.primaryText}>
              Flare uses a delegated proof-of-stake (DPoS) mechanism
              to ensure a significant and consistent level of economic security
            </p>
          </div>
        </div>
      </aside>
      <div className={cx(styles.layersWrap, styles.column__main, { [styles.animate]: isAnimating })}>
        <div className={cx(styles.layer, styles.layer__bottom)}>
          <Image src={bottom} alt='bottom' />
        </div>
        <div className={cx(styles.layer, styles.layer__middle)}>
          <Image src={middle} alt='middle' />
        </div>
        <div className={cx(styles.layer, styles.layer__top)}>
          <Image src={top} alt='top' />
        </div>
      </div>
      <aside className={styles.column__secondary}>
        <div className={styles.productsFirst}>
          <h3 className={styles.label}>Enshrined data protocols</h3>
          <div className={styles.placeholder}>
            <h2>FPO</h2>
          </div>
          <div className={styles.placeholder}>
            <h2>FPO</h2>
          </div>
        </div>
        <div className={styles.productsSecond}>
          <h3 className={styles.label}>New use cases</h3>
          <div className={styles.placeholder}>
            <h2>FPO</h2>
          </div>
        </div>
      </aside>
    </section>
  )
}
