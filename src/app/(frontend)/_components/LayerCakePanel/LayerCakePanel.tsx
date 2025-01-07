'use client'

import { useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import type { ILayerCake } from 'payload-types'
import ProductGridItem from '../ProductGrid/ProductGridItem'
import styles from './LayerCakePanel.module.scss'
import top from './layers/top.png'
import middle from './layers/middle.png'
import bottom from './layers/bottom.png'
import FlareMarkOnly from '../svgs/FlareMarkOnly'

type LayerCakeProps = ILayerCake & {
  className?: string
}

export default function LayerCakePanel({
  bannerText, primaryColumnLabel, layers, secondaryColumnSections, className,
}: LayerCakeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeHovers, setActiveHovers] = useState<number[] | false>(false)

  useEffect(() => {
    let scrollListener: () => void

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Attach scroll listener
          scrollListener = () => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect()
              const viewportHeight = window.innerHeight

              if (rect.top <= viewportHeight * 0.15 && rect.bottom >= 0) {
                setIsAnimating(true)
                setTimeout(() => {
                  setAnimationComplete(true)
                }, 1000)
              } else {
                setIsAnimating(false)
                setAnimationComplete(false)
              }
            }
          }

          window.addEventListener('scroll', scrollListener)
        } else {
          // Cleanup scroll listener when element is out of view
          if (scrollListener) {
            window.removeEventListener('scroll', scrollListener)
          }
          setIsAnimating(false)
          setAnimationComplete(false) // Reset animation state
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Observe relative to the viewport
      threshold: 0, // Trigger as soon as any part of the element is visible
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      if (scrollListener) {
        window.removeEventListener('scroll', scrollListener)
      }
    }
  }, [])

  return (
    <section className={cx(styles.wrap, className)} ref={containerRef}>
      {bannerText && <header className={styles.banner}>{bannerText}</header>}
      <div className={styles.logoWrap}>
        <FlareMarkOnly />
      </div>
      <aside
        className={styles.column__primary}
        onMouseEnter={() => setIsExpanded(animationComplete)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {primaryColumnLabel && <h3 className={styles.label}>{primaryColumnLabel}</h3>}
        <div className={cx(styles.textLayers, { [styles.animate]: isAnimating })}>
          {layers?.map((layer, index) => {
            const { id, header, text } = layer
            return (
              <div
                key={id}
                className={cx(styles.textLayer, styles[`textLayer__${index}`])}
                onMouseEnter={() => {
                  if (animationComplete) {
                    setActiveHovers([index])
                    if (!isExpanded) {
                      setIsExpanded(true)
                    }
                  }
                }}
                onMouseLeave={() => setActiveHovers(false)}
              >
                {header && <h4 className={styles.primaryHeader}>{header}</h4>}
                {text && (
                  <p className={styles.primaryText}>
                    {text}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </aside>
      <div
        className={cx(
          styles.layersWrap,
          styles.column__main,
          { [styles.animate]: isAnimating, [styles.expanded]: isExpanded },
        )}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            className={cx(
              styles.layer,
              styles.shadowLayer,
              styles.layer__bottomShadow,
              { [styles.active]: activeHovers && activeHovers.includes(2) },
            )}
          />
        ))}
        <div className={cx(styles.layer, styles.layer__bottom)}>
          <Image src={bottom} alt='bottom' />
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className={cx(
              styles.layer,
              styles.shadowLayer,
              styles.layer__middleShadow,
              { [styles.active]: activeHovers && activeHovers.includes(1) },
            )}
          />
        ))}
        <div className={cx(styles.layer, styles.layer__middle)}>
          <Image src={middle} alt='middle' />
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className={cx(
              styles.layer,
              styles.shadowLayer,
              styles.layer__topShadow,
              { [styles.active]: activeHovers && activeHovers.includes(0) },
            )}
          />
        ))}
        <div className={cx(styles.layer, styles.layer__top)}>
          <Image src={top} alt='top' />
        </div>
        {['FTSO', 'Enshrined Data Protocols', 'Fassets', 'FDC', 'Ethereum Virtual Machine', 'FlareStake'].map((dotName, i) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div key={dotName} className={cx(styles.flareDot, styles[`flareDot__${i}`])} onClick={() => false}>
            <span className={styles.flareDotText}>{dotName}</span>
          </div>
        ))}
      </div>
      <aside className={styles.column__secondary}>
        {secondaryColumnSections?.map((section) => {
          const { id, label, products } = section
          return (
            <div key={id} className={styles.products}>
              {label && <h3 className={styles.label}>{label}</h3>}
              {products?.map((product) => {
                if (typeof product !== 'object') {
                  return null
                }
                return (
                  <div key={product.id} className={styles.product}>
                    <ProductGridItem {...product} cardStyle='small' useSlugForLink />
                  </div>
                )
              })}
            </div>
          )
        })}
      </aside>
    </section>
  )
}
