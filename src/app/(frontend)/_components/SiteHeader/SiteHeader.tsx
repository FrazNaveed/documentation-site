import Link from 'next/link'
import { mainNavData, secondaryNavData } from './siteHeaderData'
import BrandLogo from '../svgs/BrandLogo'
import MainNav from '../MainNav'
import styles from './SiteHeader.module.scss'

export default function SiteHeader() {
  return (
    <>
      <header className={styles.header} id='siteHeader'>
        <div className={styles.container}>
          <Link href='/' className={styles.brandLink} aria-label='Flare brand logo'>
            <BrandLogo />
          </Link>
          <MainNav navData={mainNavData} secondaryNavData={secondaryNavData} />
        </div>
      </header>
      <div className={styles.openMenuBg} />
    </>
  )
}
