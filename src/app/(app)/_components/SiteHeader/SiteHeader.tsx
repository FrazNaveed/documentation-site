import Link from 'next/link'
import BrandLogo from '../svgs/BrandLogo'
import MainNav from '../MainNav'
import type { MainNavigation } from '../MainNav/MainNav'
import styles from './SiteHeader.module.scss'

export default async function SiteHeader() {
  const mainNavData: MainNavigation = [
    {
      title: 'Products',
      subNavSections: [
        {
          _key: '1',
          title: 'Learning Center',
          links: [
            {
              _key: '1',
              title: 'Learn About Flare',
              url: '/learn-about-flare',
            },
            {
              _key: '2',
              title: 'Wallets',
              url: '/wallets',
            },
            {
              _key: '3',
              title: 'Get FlareDrops',
              url: '/flaredrop-and-rewards',
            },
            {
              _key: '4',
              title: 'Delegate & Stake',
              url: '/delegate-and-stake',
            },
            {
              _key: '5',
              title: 'Vote',
              url: '/vote',
            },
          ],
        },
        {
          _key: '2',
          title: 'Community',
          links: [
            {
              _key: '1',
              title: 'Ecosystem Partners',
              url: '/ecosystem-partners',
            },
            {
              _key: '2',
              title: 'Ambassador Program',
              url: '/ambassador-program',
            },
            {
              _key: '3',
              title: 'Community Resources',
              url: '/community-resources',
            },
            {
              _key: '4',
              title: 'Team',
              url: '/team',
            },
          ],
        },
      ],
    },
    {
      title: 'Participate',
      subNavSections: [
        {
          _key: '3',
          title: '',
          links: [
            {
              _key: '1',
              title: 'FAssets',
              url: '/products/fassets',
              description: 'Lorem ipsum dolor sit',
              standout: true,
              icon: 'fassets',
            },
            {
              _key: '2',
              title: 'Flare Data Connector',
              url: '/products/flare-data-connector',
              description: 'Get a Data Feed',
              standout: true,
              icon: 'connector',
            },
            {
              _key: '3',
              title: 'Flare Time Series Oracle',
              url: '/products/flare-time-series-oracle',
              description: 'Get a Price',
              standout: true,
              icon: 'oracle',
            },
          ],
        },
      ],
    },
    {
      title: 'Developers',
      subNavSections: [
        {
          _key: '4',
          title: 'Web Resources',
          links: [
            {
              _key: '1',
              title: 'Flare Developer Resources',
              url: '/resources/developer-hub',
            },
            {
              _key: '2',
              title: 'Grants',
              url: '/resources/grants',
            },
            {
              _key: '3',
              title: 'Bug Bounty',
              url: 'https://immunefi.com/bug-bounty/flarenetwork/information/',
              isExternal: true,
            },
            {
              _key: '4',
              title: 'Developer Support',
              url: '/resources/developer-support',
            },
          ],
        },
        {
          _key: '5',
          title: 'Dev Hub',
          hasBackground: true,
          links: [
            {
              _key: '1',
              title: 'Getting Started',
              url: 'https://dev.flare.network/getting-started',
              icon: 'flareLogo',
            },
            {
              _key: '2',
              title: 'FAssets Docs',
              url: 'https://dev.flare.network/fassets',
              icon: 'fassets',
            },
            {
              _key: '3',
              title: 'Flare Data Connector Docs',
              url: 'https://dev.flare.network/flare-data-connector',
              icon: 'connector',
            },
            {
              _key: '4',
              title: 'Flare Time Series Oracle Docs',
              url: 'https://dev.flare.network/flare-time-series-oracle',
              icon: 'oracle',
            },
          ],
        },
      ],
    },
    {
      title: 'Network',
      subNavSections: [
        {
          _key: '6',
          title: 'Web Resources',
          links: [
            {
              _key: '1',
              title: 'Flarescan',
              url: 'https://dev.flare.network/flarescan',
              isExternal: true,
            },
            {
              _key: '2',
              title: 'Flare Block Explorer',
              url: 'https://dev.flare.network/flare-block-explorer',
              isExternal: true,
            },
            {
              _key: '3',
              title: 'FTSO Monitor',
              url: 'https://dev.flare.network/ftso-monitor',
              isExternal: true,
            },
            {
              _key: '4',
              title: 'Flare Block Explorer',
              url: 'https://dev.flare.network/flare-block-explorer',
              isExternal: true,
            },
          ],
        },
        {
          _key: '7',
          title: 'Dev Hub',
          hasBackground: true,
          links: [
            {
              _key: '1',
              title: 'Network configuration',
              url: 'https://dev.flare.network/network-configuration',
            },
            {
              _key: '2',
              title: 'Run an Observer Node',
              url: 'https://dev.flare.network/run-an-observer-node',
            },
            {
              _key: '3',
              title: 'Run a Validator Node',
              url: 'https://dev.flare.network/run-a-validator-node',
            },
          ],
        },
      ],
    },
    {
      title: 'News & Events',
      subNavSections: [
        {
          _key: '8',
          title: '',
          links: [
            {
              _key: '1',
              title: 'News',
              url: '/news',
            },
            {
              _key: '2',
              title: 'Past Events',
              url: '/past-events',
            },
            {
              _key: '3',
              title: 'Upcoming Events',
              url: '/events',
            },
          ],
        },
      ],
    },
  ]

  return (
    <header className={styles.header} id='siteHeader'>
      <div className={styles.container}>
        <Link href='/' className={styles.brandLink} aria-label='Flare brand logo'>
          <BrandLogo />
        </Link>
        <MainNav navData={mainNavData} />
      </div>
    </header>
  )
}
