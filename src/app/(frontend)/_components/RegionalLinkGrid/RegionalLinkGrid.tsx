import * as flags from 'country-flag-icons/react/3x2'
import type { IRegionalLinkGrid } from '@/payload-types'
import ExternalLink from 'src/app/(frontend)/_components/ExternalLink'
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
              <div key={id} className={styles.link}>
                <ExternalLink href={link} className={styles.linkInner} iconClassName={styles.arrow}>
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
                </ExternalLink>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
