import { getDevGuides } from 'src/app/(frontend)/_lib/payload/devGuideQueries'
import DevGuideGridInner from './DevGuideGridInner'
import styles from './DevGuideGrid.module.scss'

export default async function DevGuideGrid() {
  const devGuideData = await getDevGuides()
  const devGuides = devGuideData?.docs
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <DevGuideGridInner developerGuides={devGuides} />
      </div>
    </div>
  )
}
