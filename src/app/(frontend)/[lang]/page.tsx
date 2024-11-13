import styles from './page.module.scss'

export default function Page() {
  return (
    <div className={styles.wrap}>
      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <video className={styles.heroBg} autoPlay loop muted>
            <source src='/en/video/home_hero_left.mp4' type='video/mp4' />
          </video>
          <h3 className={styles.heroHeader}>The Blockchain for Data</h3>
        </div>
      </div>
    </div>
  )
}
