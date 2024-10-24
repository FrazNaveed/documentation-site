'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'
import Pill from 'src/app/(frontend)/_components/Pill'
import useIsBelowBreakpoint from 'src/app/(frontend)/_hooks/useIsBelowBreakpoint'
import { DeveloperGuide, Product } from 'payload-types'
import styles from './DevGuideGridInner.module.scss'

type DevGuideGridInnerProps = {
  developerGuides?: DeveloperGuide[]
  devHubProducts?: Product[]
}

export default function DevGuideGridInner({ developerGuides, devHubProducts = [] }: DevGuideGridInnerProps) {
  const allProductsFilterSlug = 'all'
  const [isBelowBreakpoint] = useIsBelowBreakpoint()
  const [allShown, setAllShown] = useState(false)
  const [activeFilter, setActiveFilter] = useState(allProductsFilterSlug)
  const devGuides = developerGuides || []
  const initialNumberShown = isBelowBreakpoint ? 3 : 6
  let filteredGuides = devGuides
  if (activeFilter !== allProductsFilterSlug) {
    filteredGuides = devGuides.filter((guide) => guide.product && typeof guide.product === 'object' && guide.product.slug === activeFilter)
  }
  const visibleGuides = allShown ? filteredGuides : filteredGuides.slice(0, initialNumberShown)
  const devGuidesCount = filteredGuides.length
  const devGuidesExist = visibleGuides.length > 0
  const displayShowButton = filteredGuides.length > initialNumberShown
  const allProductsFilter = {
    id: -1, title: 'All Products', slug: allProductsFilterSlug, updatedAt: '', createdAt: '',
  }
  const productFilters = [allProductsFilter, ...devHubProducts]
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
      <div className={styles.filters}>
        <ul className={styles.filterList}>
          {productFilters.map((product) => (
            <li key={product.id}>
              <button
                className={cx(styles.filterButton, { [styles.active]: activeFilter === product.slug })}
                type='button'
                onClick={() => setActiveFilter(product.slug)}
              >
                {product.title}
              </button>
            </li>
          ))}
        </ul>
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
              <Link href='https://flare.network' key={id} className={cx(styles.devGuide)}>
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
              </Link>
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
