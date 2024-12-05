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
    <section className={cx(styles.wrap, className)} ref={containerRef}>
      {bannerText && <header className={styles.banner}>{bannerText}</header>}
      <div className={styles.logoWrap}>
        <FlareMarkOnly />
      </div>
      <aside className={styles.column__primary}>
        {primaryColumnLabel && <h3 className={styles.label}>{primaryColumnLabel}</h3>}
        <div className={cx(styles.textLayers, { [styles.animate]: isAnimating })}>
          {layers?.map((layer, index) => {
            const { id, header, text } = layer
            return (
              <div key={id} className={cx(styles.textLayer, styles[`textLayer__${index}`])}>
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
      <div className={cx(styles.layersWrap, styles.column__main, { [styles.animate]: isAnimating })}>
        <div className={cx(styles.layer, styles.layer__bottomShadow)} />
        <div className={cx(styles.layer, styles.layer__bottom)}>
          <Image src={bottom} alt='bottom' />
        </div>
        <div className={cx(styles.layer, styles.layer__middleShadow)} />
        <div className={cx(styles.layer, styles.layer__middle)}>
          <Image src={middle} alt='middle' />
        </div>
        <div className={cx(styles.layer, styles.layer__topShadow)} />
        <div className={cx(styles.layer, styles.layer__top)}>
          <Image src={top} alt='top' />
        </div>
        {['ftso', 'fdc', 'fassets', 'fpo1', 'fpo2', 'fpo3'].map((dotName) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div key={dotName} className={cx(styles.flareDot, styles[`flareDot__${dotName}`])} onClick={() => false}>
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
                    <ProductGridItem {...product} />
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
