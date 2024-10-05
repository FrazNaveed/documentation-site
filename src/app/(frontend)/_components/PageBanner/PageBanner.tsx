import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './PageBanner.module.scss'

export default async function PageBanner() {
  const content = null // TODO: fetch data from API

  return (
    <div className={styles.pageBanner}>
      <div className={styles.pageBannerContent}>
        foo
        {content && <LexicalRenderer content={content as PayloadLexicalReactRendererContent} />}
      </div>
    </div>
  )
}
