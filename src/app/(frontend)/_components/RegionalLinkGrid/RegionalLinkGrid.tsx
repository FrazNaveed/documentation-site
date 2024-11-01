import Link from 'next/link'
import * as flags from 'country-flag-icons/react/1x1'
import type { IRegionalLinkGrid } from '@/payload-types'
import DiagonalArrowSquare from 'src/app/(frontend)/_components/svgs/DiagonalArrowSquare'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './RegionalLinkGrid.module.scss'

export default function RegionalLinkGrid({ title, description, links }: IRegionalLinkGrid) {
  return (
    <section>
      {(title || description) && (
        <div className={styles.grid}>
          <div className={styles.intro}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && (
              <div className={styles.step_Descrip}>
                <LexicalRenderer content={description as PayloadLexicalReactRendererContent} />
              </div>
            )}
          </div>
        </div>
      )}
      {(links && links.length > 0) && (
        <div className={styles.links}>
          {links.map((regionalLink) => {
            const {
              id,
              link,
              name,
              translatedName,
              country,
            } = regionalLink
            const FlagComponent = country && flags[country]
            return (
              <Link key={id} href={link} className={styles.link}>
                <div className={styles.linkInner}>
                  {FlagComponent && (
                    <div className={styles.flag}>
                      <FlagComponent title={country} className={styles.flag_Icon} />
                    </div>
                  )}
                  <div className={styles.names}>
                    <div className={styles.name}>
                      {name}
                    </div>
                    <div className={styles.translatedName}>
                      {translatedName}
                    </div>
                  </div>
                  <DiagonalArrowSquare className={styles.arrow} />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
