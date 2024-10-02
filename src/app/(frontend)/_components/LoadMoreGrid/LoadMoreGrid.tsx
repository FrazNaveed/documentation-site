'use client'

import { useEffect, useState } from 'react'
import Button from '../Button'
import styles from './LoadMoreGrid.module.scss'
import { News, NewsSubType } from '@/payload-types'
import TeaserGrid from '../TeaserGrid'

export type LoadMoreGridProps = {
  limit?: number,
  excludeIds?: number[]
  fetchFn: (limit: number, pageNumber: number, onPageIds: number[]) => Promise<any>
}



export default function LoadMoreGrid({ limit = 12, excludeIds = [], fetchFn}: LoadMoreGridProps) {
  const [gridItems, setGridItems] = useState<News[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [hasNextPage, setHasNextPage ] = useState<boolean>(true)

  const handleClick = async () => {
    const newEntries:
      {
        docs: News[],
        nextPage?: number,
        hasNextPage: boolean,
      } = await fetchFn(limit, pageNumber, excludeIds)
      console.log('newEntries', newEntries)
    setHasNextPage(newEntries.hasNextPage)
    if (newEntries.docs.length > 0) {
      setGridItems([...gridItems, ...newEntries.docs])
      if (newEntries.nextPage) {
        setPageNumber(newEntries.nextPage)
      }
    }
  }
  

  return (
    <>
      {gridItems.length > 0 && <div className={styles.gridWrap}>
        <TeaserGrid teasers={gridItems} />
      </div>}
      {hasNextPage && <div className={styles.btnWrap}>
        <Button text='Load More' size='large' onClick={handleClick} />
      </div>}
    </>
  )
}
