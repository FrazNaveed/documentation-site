import Link from 'next/link'
import type { Page } from '@/payload-types'
import slugifyLinkText from './utils/slugifyLinkText'
import styles from './SideNav.module.scss'

export type SideNavProps = {
  components: Page['components']
}

export default function SideNav({ components }: SideNavProps) {
  const sideNavLinks = components?.map((component) => (component.createSideNavLink ? component.linkText : null))
    .filter((value) => value !== null && value !== undefined)
  if (!sideNavLinks || sideNavLinks.length === 0) {
    return null
  }
  return (
    <div className={styles.sideNav}>
      <div className={styles.wrap}>
        <p className={styles.header}>On this page</p>
        <ul className={styles.list}>
          {sideNavLinks.map((linkText) => {
            const link = slugifyLinkText(linkText)
            return (
              <li key={link} id={`jump-link-${link}`} className={styles.listItem}>
                <Link href={`#${link}`} className={styles.link}>
                  {linkText}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
