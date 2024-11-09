'use client'

import { Fragment, useState } from 'react'
import { TableWithDrawers } from '@/payload-types'
import cx from 'classnames'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TableDrawers.module.scss'

// TODO: Replace with SVG or standard icon for plus/minus
const ShowHideBtn = ({ onClick, collapsed = false }: {onClick: () => void, collapsed: boolean}) => (
  <button
    type='button'
    aria-label='Show/Hide'
    className={cx(styles.showHideBtn, styles.hideOnTable)}
    onClick={onClick}
  >
    {collapsed ? '+' : '-'}
  </button>
)

export type TableWithDrawersProps = {
  data: TableWithDrawers,
  className?: string
}

export default function TableDrawers({ data, className }: TableWithDrawersProps) {
  const {
    column1Header,
    column2Header,
    sections,
  } = data

  const [collapsedDrawers, setCollapsedDrawers] = useState<number[]>([])

  const handleClick = (indexToCollapse: number) => {
    setCollapsedDrawers((prev) => {
      if (prev.includes(indexToCollapse)) {
        return prev.filter((i) => i !== indexToCollapse)
      }
      return [...prev, indexToCollapse]
    })
  }

  return (
    <section className={cx(styles.container, className)}>
      <div className={cx(styles.headerRow, styles.row)}>
        <div className={cx(styles.cell, styles.label, { [styles.roundBottom]: collapsedDrawers.includes(0) })}>
          {/* Hack. We compress the top section name into the first header row */}
          <h4 className={styles.sectionHeader}>
            {sections && sections?.length > 0 && sections[0].name}
            <ShowHideBtn onClick={() => handleClick(0)} collapsed={collapsedDrawers.includes(0)} />
          </h4>
        </div>
        <div className={cx(styles.cell, styles.hideInDrawers)}>
          <h3 className={styles.sectionHeader}>{column1Header}</h3>
        </div>
        <div className={cx(styles.cell, styles.hideInDrawers)}>
          <h3 className={styles.sectionHeader}>{column2Header}</h3>
        </div>
      </div>
      {sections && sections.map(({ name, id, rows }, index) => (
        <Fragment key={id}>
          {/* Hack II: the re-hacking. We hide the header on the first section because of Hack I */}
          {index > 0 && (
            <div className={cx(styles.headerRow, styles.row)}>
              <div
                className={cx(styles.cell, styles.label, { [styles.roundBottom]: collapsedDrawers.includes(index) })}
              >
                <h4 className={styles.sectionHeader}>{name}</h4>
                <ShowHideBtn onClick={() => handleClick(index)} collapsed={collapsedDrawers.includes(index)} />
              </div>
              <div className={cx(styles.cell, styles.hideInDrawers)} />
              <div className={cx(styles.cell, styles.hideInDrawers)} />
            </div>
          )}
          <div>
            {rows && rows.map(({
              // eslint-disable-next-line no-shadow
              rowLabel, column1Data, column2Data, id,
            }, rowIndex) => (
              <div
                className={cx(styles.row, {
                  [styles.rowLast]: rowIndex === rows.length - 1,
                  [styles.collapsed]: collapsedDrawers.includes(index),
                })}
                key={id}
              >
                <div className={cx(styles.cell, styles.label, { [styles.hideInDrawers]: !rowLabel })}>
                  {rowLabel && <h4 className={styles.labelText}>{rowLabel}</h4>}
                </div>
                <div className={cx(styles.cell)}>
                  <h3 className={cx(styles.sectionHeader, styles.hideOnTable)}>{column1Header}</h3>
                  <LexicalRenderer content={column1Data as PayloadLexicalReactRendererContent} />
                </div>
                <div className={cx(styles.cell)}>
                  <h3 className={cx(styles.sectionHeader, styles.hideOnTable)}>{column2Header}</h3>
                  <LexicalRenderer content={column2Data as PayloadLexicalReactRendererContent} />
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </section>
  )
}
