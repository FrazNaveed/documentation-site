'use client'

import { useState } from 'react'
import { News } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import Button from '../Button'
import styles from './LoadMoreGrid.module.scss'
import TeaserGrid from '../TeaserGrid'

export type LoadMoreGridProps = {
  limit?: number,
  excludeIds?: number[]
  // eslint-disable-next-line no-unused-vars
  fetchFn: (limit: number, pageNumber: number, onPageIds: number[], type?: number | null) => (
    Promise<PaginatedDocs<News> | null>
  )
  buttonText?: string
  type?: number | null
}

export default function LoadMoreGrid({
  limit = 12, excludeIds = [], fetchFn, buttonText = 'Load More', type,
}: LoadMoreGridProps) {
  const [gridItems, setGridItems] = useState<News[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const newEntries = await fetchFn(limit, pageNumber, excludeIds, type)
      if (newEntries === null) {
        throw new Error('Error loading more news posts')
      }
      setHasNextPage(newEntries.hasNextPage)
      if (newEntries.docs.length > 0) {
        setGridItems((prevItems) => [...prevItems, ...newEntries.docs])
        if (newEntries.nextPage) {
          setPageNumber((prevPage) => newEntries.nextPage || prevPage)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching more items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {gridItems.length > 0 && (
      <div className={styles.gridWrap}>
        <TeaserGrid teasers={gridItems} />
      </div>
      )}
      {hasNextPage && (
      <div className={styles.btnWrap}>
        <Button text={buttonText} disabled={isLoading} size='large' onClick={handleClick} />
      </div>
      )}
    </>
  )
}
