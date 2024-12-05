import type { Page } from 'payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import styles from './PageBanner.module.scss'

interface PageBannerProps {
  content: NonNullable<Page['pageBanner']>['bannerText'];
}

export default function PageBanner({ content }: PageBannerProps) {
  if (!content) {
    return null
  }
  return (
    <div className={styles.pageBanner}>
      <div className={styles.pageBannerContent}>
        {content && <LexicalRenderer content={content} />}
      </div>
    </div>
  )
}
