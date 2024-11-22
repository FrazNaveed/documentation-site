import cx from 'classnames'
import type { IDecentralizedPanel } from 'payload-types'
import styles from './DecentralizedPanel.module.scss'
import DecentralizedGraph from './DecentralizedGraph'

type DecentralizedPanelProps = IDecentralizedPanel & {
  className?: string
}

export default function DecentralizedPanel({
  header, subheader, text, className,
}: DecentralizedPanelProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      <div className={styles.container}>
        <DecentralizedGraph />
        <div className={styles.content}>
          {header && <h1 className={styles.header}>{header}</h1>}
          {subheader && <span className={styles.counter}>{subheader}</span>}
          {text && (
            <>
              <br />
              <p className={styles.text}>
                3.3% maximum stake per data provider
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
