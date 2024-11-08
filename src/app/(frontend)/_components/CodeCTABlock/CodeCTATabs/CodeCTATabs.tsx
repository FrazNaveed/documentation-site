'use client'

import { useState } from 'react'
import cx from 'classnames'
import styles from '../CodeCTABlock.module.scss'

type CodeCTATabsProps = {
  labels: string[]
}

export default function CodeCTATabs({ labels }: CodeCTATabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const onTabClick = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <div
      className={cx(styles.tabs, styles[`tabs__active-${activeIndex}`])}
      role='tablist'
      aria-label='Code examples by language'
    >
      {labels.map((label, index) => (
        <button
          key={label}
          onClick={() => onTabClick(index)}
          id={`code-cta-tab-${index}`}
          className={cx(styles.tab, { [styles.tab__active]: activeIndex === index })}
          type='button'
          role='tab'
          aria-selected={activeIndex === index}
          aria-controls={`code-cta-tabpanel-${index}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
