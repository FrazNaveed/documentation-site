'use client'

import { useState } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import Pill from 'src/app/(frontend)/_components/Pill'
import useIsBelowBreakpoint from 'src/app/(frontend)/_hooks/useIsBelowBreakpoint'
import { DeveloperGuide } from 'payload-types'
import styles from './DevGuideGridInner.module.scss'

type DevGuideGridInnerProps = {
  developerGuides?: DeveloperGuide[]
}

export default function DevGuideGridInner({ developerGuides }: DevGuideGridInnerProps) {
  const [isBelowBreakpoint] = useIsBelowBreakpoint()
  const [allShown, setAllShown] = useState(false)
  const devGuides = developerGuides || []
  const initialNumberShown = isBelowBreakpoint ? 3 : 6
  const filteredGuides = devGuides // Will be used for product type filtering
  const visibleGuides = allShown ? filteredGuides : filteredGuides.slice(0, initialNumberShown)
  const devGuidesCount = filteredGuides.length
  const devGuidesExist = visibleGuides.length > 0
  const displayShowButton = filteredGuides.length > initialNumberShown
  const toggleAllShown = () => {
    setAllShown((prev) => !prev)
  }
  return (
    <>
      <div className={styles.headerWrap}>
        <h2 className={styles.header}>
          Build with Developer Hub Guides
        </h2>
        <p className={styles.showCount}>
          {`Showing ${visibleGuides.length} of ${devGuidesCount}`}
        </p>
      </div>
      {devGuidesExist && (
        <div id='dev-guide-grid' className={styles.content}>
          {visibleGuides.map((devGuide) => {
            const {
              id,
              title,
              shortDescription,
              tags,
              product,
            } = devGuide
            return (
              <div key={id} className={cx(styles.devGuide)}>
                {(product && typeof product === 'object') && (
                  <div className={styles.product}>
                    {product.icon && typeof product.icon === 'object' && product.icon.url && product.icon.alt && (
                      <Image
                        className={styles.product_Icon}
                        src={product.icon.url}
                        alt={product.icon.alt}
                        width={product.icon.width ?? 0}
                        height={product.icon.height ?? 0}
                      />
                    )}
                    <h4 className={styles.product_Title}>{product.title}</h4>
                  </div>
                )}
                <h3 className={styles.title}>
                  {title}
                </h3>
                <p className={styles.description}>
                  {shortDescription}
                </p>
                {(tags && tags.length > 0) && (
                  <div className={styles.tags}>
                    {tags?.map((tag) => (
                      typeof tag === 'object' && <Pill key={tag.id} text={tag.title} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      {displayShowButton && (
        <div className={styles.buttonWrap}>
          <button
            type='button'
            className={styles.button}
            onClick={toggleAllShown}
            aria-expanded={allShown}
            aria-controls='dev-guide-grid'
          >
            {allShown ? '- Show Less' : '+ Show All'}
          </button>
        </div>
      )}
    </>
  )
}
