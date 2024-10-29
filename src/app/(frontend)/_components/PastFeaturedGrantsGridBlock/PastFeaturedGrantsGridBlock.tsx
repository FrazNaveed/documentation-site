import type { Grant } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './PastFeaturedGrantsGridBlock.module.scss'
import LexicalRenderer from '../LexicalRenderer'

export type PastFeaturedGrantsGridBlockProps = {
  gridTitle?: string | null
  grantsGrid?: (number | Grant)[] | null
}

export default function PastFeaturedGrantsGridBlock({ gridTitle, grantsGrid }: PastFeaturedGrantsGridBlockProps) {
  return (
    <section className={styles.wrap}>
      {gridTitle && <h2 className={styles.gridTitle}>{gridTitle}</h2>}
      <div className={styles.grantsGrid}>
        {grantsGrid?.map((grant: any) => {
          const {
            name,
            description,
            id,
            logo,
            country,
            announcementLink,
            grantCategory,
          } = grant
          return (
            <li key={id} className={styles.grant}>
              <div>
                {/* <Link href='/'> */}
                {(logo || name) && (
                  <div className={styles.grantHeader}>
                    {logo && typeof logo === 'object' && logo.url
                      && (
                      <div>
                        <Image
                          src={logo.url}
                          alt={logo.alt}
                          width={logo.width ?? 0}
                          height={logo.height ?? 0}
                        />
                      </div>
                      )}
                    {name && <h2 className={styles.name}>{name}</h2>}
                  </div>
                )}
                {description && <LexicalRenderer content={description as PayloadLexicalReactRendererContent} />}
                <div className={styles.grantFooter}>
                  {grantCategory?.map((category: any) => (
                    <p>{category.title}</p>
                  ))}
                  {country}
                  {announcementLink && (
                    <Link href={announcementLink}>YO</Link>
                  )}
                </div>
                {/* </Link> */}
              </div>
            </li>
          )
        })}
      </div>
    </section>
  )
}
