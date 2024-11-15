import styles from './DecentralizedPanel.module.scss'
import DecentralizedGraph from './DecentralizedGraph'

export default function DecentralizedPanel() {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <DecentralizedGraph />
        <div className={styles.content}>
          <h1 className={styles.header}>Decentralized</h1>
          <span className={styles.counter}>100 Data Providers</span>
          <br />
          <p className={styles.text}>
            3.3% maximum stake per data provider
          </p>
        </div>
      </div>
    </section>
  )
}
