import Image from 'next/image'
import styles from './TeamGridBlock.module.scss'

export default function TeamGridBlock({ title, team }: any) {
  return (
    <section className={styles.teamGridBlock}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <ul className={styles.teamGridWrap}>
        {team?.map((teamMember: any) => {
          const {
            fullName,
            headshot,
            id,
            jobTitle,
          } = teamMember
          return (
            <li key={id} className={styles.teamGridMember}>
              <div className={styles.imgWrap}>
                <Image
                  src={headshot.url}
                  alt={headshot.alt}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className={styles.name}>{fullName}</h3>
              <p className={styles.jobTitle}>{jobTitle}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
