'use client'

import { useEffect, useState } from 'react'
import styles from './FastPanel.module.scss'

export default function FastCounter({ start, rate }: {start: number, rate: number}) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, rate)
    return () => clearInterval(interval)
  }, [rate])
  return <span className={styles.counter}>{count.toLocaleString()}</span>
}
