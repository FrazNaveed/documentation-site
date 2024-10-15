import Image from 'next/image'
import type { Person } from '@/payload-types'
import styles from './TeamGridBlock.module.scss'

export type TeamGridProps = {
  gridTitle?: string | null | undefined
  team?: Person[]
}

export default function TeamGridBlock({ gridTitle, team }: TeamGridProps) {
  return (
    <section className={styles.teamGridBlock}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{gridTitle}</h2>
      </div>
      <ul className={styles.teamGridWrap}>
        {team?.map((teamMember: Person) => {
          const {
            fullName,
            headshot,
            id,
            jobTitle,
          } = teamMember
          return (
            <li key={id} className={styles.teamGridMember}>
              {(headshot && typeof headshot === 'object' && headshot.url) && (
                <div className={styles.imgWrap}>
                  <Image
                    src={headshot?.url}
                    alt={headshot?.alt}
                    width={184}
                    height={245}
                  />
                </div>
              )}
              <h3 className={styles.name}>{fullName}</h3>
              <p className={styles.jobTitle}>{jobTitle}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
