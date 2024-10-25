import { getDevGuides } from 'src/app/(frontend)/_lib/payload/devGuideQueries'
import { Product } from 'payload-types'
import DevGuideGridInner from './DevGuideGridInner'
import styles from './DevGuideGrid.module.scss'

type DevGuideGridProps = {
  devHubProducts?: Product[]
}

export default async function DevGuideGrid({ devHubProducts }: DevGuideGridProps) {
  const devGuideData = await getDevGuides()
  const devGuides = devGuideData?.docs
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <DevGuideGridInner developerGuides={devGuides} devHubProducts={devHubProducts} />
      </div>
    </div>
  )
}
