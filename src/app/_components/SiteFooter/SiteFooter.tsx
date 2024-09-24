import Link from 'next/link'
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

type FooterNavigation = {
  _key: string
  title: string
  url: string
}[]

type secondaryNavigationData = {
  _key: string
  title: string
  url: string
  isExternal?: boolean
}[]

export default async function SiteFooter() {
  const navData: FooterNavigation = [
    {
      _key: '1',
      title: 'Contact',
      url: '/contact',
    },
    {
      _key: '2',
      title: 'Terminology',
      url: '/terminology',
    },
    {
      _key: '3',
      title: 'Audits',
      url: '/audits',
    },
  ]

  const seconadryNavLabel = 'Dev Links'

  const secondaryNavData: secondaryNavigationData = [
    {
      _key: '1',
      title: 'Flarescan',
      url: 'https://dev.flare.network/flarescan',
      isExternal: true,
    },
    {
      _key: '2',
      title: 'FTSO Monitor',
      url: 'https://dev.flare.network/ftso-monitor',
      isExternal: true,
    },
    {
      _key: '3',
      title: 'Brand Assets',
      url: '/brand-assets',
    },
    {
      _key: '4',
      title: 'Flare Systems Explorer',
      url: 'https://flare-systems-explorer.flare.network/',
      isExternal: true,
    },
    {
      _key: '5',
      title: 'Flare P-Chain Explorer',
      url: 'https://flare.space/dapp/p-chain-explorer/',
      isExternal: true,
    },
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
                  Copyright Flare {(new Date().getFullYear())}
                </li>
              </ul>
            </nav>
          )}
          <ul className={styles.socialIcons}>
            <li className={styles.socialIcons_Item}>
              <Link href='https://github.com/flare-foundation' className={styles.socialIcons_Link} aria-label='GitHub' >
                <GitHub />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://www.youtube.com/c/Flare_Networks' className={styles.socialIcons_Link} aria-label='YouTube' >
                <YouTube />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://www.linkedin.com/company/flarenetwork/' className={styles.socialIcons_Link} aria-label='LinkedIn' >
                <LinkedIn />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://discord.com/invite/flarenetwork' className={styles.socialIcons_Link} aria-label='Discord' >
                <Discord />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://twitter.com/FlareNetworks' className={styles.socialIcons_Link} aria-label='XSocial' >
                <XSocial />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://medium.com/flarenetwork' className={styles.socialIcons_Link} aria-label='Medium' >
                <Medium />
              </Link>
            </li>
            <li className={styles.socialIcons_Item}>
              <Link href='https://t.me/FlareNetwork' className={styles.socialIcons_Link} aria-label='Telegram' >
                <Telegram />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.devLinks}>
          <p className={styles.secondaryNavLabel}>
            {seconadryNavLabel}
          </p>
          {secondaryNavData?.length && (
            <nav id='devLinksNav' className={styles.secondaryNavWrap} aria-label={`${seconadryNavLabel} menu`}>
              <ul className={styles.secondaryNav}>
                {secondaryNavData.map((link) => {
                  const LinkComponent = link.isExternal ? ExternalLink : Link
                  return (
                    <li key={link._key} className={styles.secondaryNav_Item}>
                      <LinkComponent
                        href={link.url}
                        className={styles.secondaryNav_Link}
                        {...(link.isExternal ? {iconClassName: styles.secondaryNav_LinkExternalIcon} : {})}
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
