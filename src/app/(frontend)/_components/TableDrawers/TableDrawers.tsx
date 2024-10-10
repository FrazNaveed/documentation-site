import { Fragment } from 'react'
import { TableWithDrawers } from '@/payload-types'
import cx from 'classnames'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import LexicalRenderer from '../LexicalRenderer'
import styles from './TableDrawers.module.scss'

export default function TableDrawers({ data }: {data: TableWithDrawers}) {
  const {
    column1Header,
    column2Header,
    sections,
  } = data

  return (
    <section className={cx(styles.container)}>
      <div className={cx(styles.headerRow, styles.row)}>
        <div className={cx(styles.cell, styles.label)}>
          {/* Hack. We compress the top section into the first header row */}
          <h4 className={styles.sectionHeader}>
            {sections && sections?.length > 0 && sections[0].name}
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
              <div className={cx(styles.cell, styles.label)}>
                <h4 className={styles.sectionHeader}>{name}</h4>
              </div>
              <div className={cx(styles.cell, styles.hideInDrawers)} />
              <div className={cx(styles.cell, styles.hideInDrawers)} />
            </div>
          )}
          <div>
            {rows && rows.map(({
              // eslint-disable-next-line no-shadow
              rowLabel, column1Data, column2Data, id,
            // eslint-disable-next-line no-shadow
            }, index) => (
              <div className={cx(styles.row, { [styles.rowLast]: index === rows.length - 1 })} key={id}>
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
