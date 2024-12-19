import Link from 'next/link'
import cx from 'classnames'
import { navData, secondaryNavLabel, secondaryNavData } from './siteFooterData'
import ExternalLink from '../ExternalLink'
import FooterLogoTagline from '../svgs/FooterLogoTagline'
import GitHub from '../svgs/GitHub'
import YouTube from '../svgs/YouTube'
import LinkedIn from '../svgs/LinkedIn'
import Discord from '../svgs/Discord'
import XSocial from '../svgs/XSocial'
import Medium from '../svgs/Medium'
import Telegram from '../svgs/Telegram'
import styles from './SiteFooter.module.scss'

export default async function SiteFooter() {
  const socialLinks = [
    { href: 'https://github.com/flare-foundation', label: 'GitHub', Icon: GitHub },
    { href: 'https://www.youtube.com/c/Flare_Networks', label: 'YouTube', Icon: YouTube },
    { href: 'https://www.linkedin.com/company/flarenetwork/', label: 'LinkedIn', Icon: LinkedIn },
    { href: 'https://discord.com/invite/flarenetwork', label: 'Discord', Icon: Discord },
    { href: 'https://twitter.com/FlareNetworks', label: 'X', Icon: XSocial },
    { href: 'https://medium.com/flarenetwork', label: 'Medium', Icon: Medium },
    { href: 'https://t.me/FlareNetwork', label: 'Telegram', Icon: Telegram },
  ]

  return (
    <footer className={styles.footer} id='siteFooter'>
      <div className={styles.container}>
        <div className={styles.main}>
          <Link href='/' className={styles.brandLink} aria-label='Flare brand logo. The blockchain for data.'>
            <FooterLogoTagline className={styles.logoTagline} />
          </Link>
          {navData?.length && (
            <nav id='footerNav' className={styles.footerNavWrap} aria-label='Footer menu'>
              <ul className={styles.footerNav}>
                {navData.map((link) => (
                  <li key={link._key} className={styles.footerNav_Item}>
                    <Link href={link.url} className={styles.footerNav_Link}>
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li className={styles.footerNav_Item}>
                  &copy; Flare
                  {' '}
                  {(new Date().getFullYear())}
                </li>
              </ul>
            </nav>
          )}
          <ul className={styles.socialIcons}>
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label} className={styles.socialIcons_Item}>
                <Link
                  href={href}
                  className={cx(styles.socialIcons_Link, styles[`socialIcons${label}`])}
                  aria-label={label}
                >
                  <Icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.devLinks}>
          <p className={styles.secondaryNavLabel}>
            {secondaryNavLabel}
          </p>
          {secondaryNavData?.length && (
            <nav id='devLinksNav' className={styles.secondaryNavWrap} aria-label={`${secondaryNavLabel} menu`}>
              <ul className={styles.secondaryNav}>
                {secondaryNavData.map((link) => {
                  const LinkComponent = link.isExternal ? ExternalLink : Link
                  return (
                    <li key={link._key} className={styles.secondaryNav_Item}>
                      <LinkComponent
                        href={link.url}
                        className={styles.secondaryNav_Link}
                        {...(link.isExternal ? { iconClassName: styles.secondaryNav_LinkExternalIcon } : {})}
                      >
                        {link.title}
                      </LinkComponent>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}
