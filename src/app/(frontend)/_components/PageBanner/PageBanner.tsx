import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './PageBanner.module.scss'

export default function PageBanner({ content }:any) {
  return (
    <div className={styles.pageBanner}>
      <div className={styles.pageBannerContent}>
        {content && <LexicalRenderer content={content as PayloadLexicalReactRendererContent} />}
      </div>
    </div>
  )
}
