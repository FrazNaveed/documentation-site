import type { MainNavigation, SecondaryNavigation } from '../MainNav/MainNav'

export const mainNavData: MainNavigation = [
  {
    title: 'Participate',
    subNavSections: [
      {
        _key: '1',
        title: 'Learning Center',
        links: [
          // {
          //   _key: '1',
          //   title: 'Learn About Flare',
          //   url: '/learn-about-flare',
          // },
          {
            _key: '2',
            title: 'Wallets',
            url: '/wallets',
          },
          {
            _key: '3',
            title: 'Get FlareDrops',
            url: '/flaredrops',
          },
          {
            _key: '4',
            title: 'Delegating & Staking',
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
          // {
          //   _key: '1',
          //   title: 'Ecosystem Partners',
          //   url: '/ecosystem-partners',
          // },
          // {
          //   _key: '2',
          //   title: 'Ambassador Program',
          //   url: '/ambassador-program',
          // },
          {
            _key: '3',
            title: 'Community Resources',
            url: '/community',
          },
          {
            _key: '4',
            title: 'Careers',
            url: '/careers',
          },
        ],
      },
    ],
  },
  {
    title: 'Products',
    subNavSections: [
      {
        _key: '3',
        title: '',
        standout: true,
        links: [
          {
            _key: '1',
            title: 'FAssets',
            url: '/products/fassets',
            description: 'Get your FAssets',
            icon: 'fassets',
          },
        ],
      },
      {
        _key: '32',
        title: '',
        standout: true,
        links: [
          {
            _key: '2',
            title: 'Flare Data Connector',
            url: '/products/flare-data-connector',
            description: 'Get a Data Feed',
            icon: 'connector',
          },
        ],
      },
      {
        _key: '33',
        title: '',
        standout: true,
        links: [
          {
            _key: '3',
            title: 'Flare Time Series Oracle',
            url: '/products/flare-time-series-oracle',
            description: 'Get a Price',
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
          // {
          //   _key: '3',
          //   title: 'Bug Bounty',
          //   url: 'https://immunefi.com/bug-bounty/flarenetwork/information/',
          //   isExternal: true,
          // },
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
            url: 'https://dev.flare.network/network/getting-started',
            icon: 'flareLogo',
          },
          {
            _key: '2',
            title: 'FAssets Docs',
            url: 'https://dev.flare.network/fassets/overview',
            icon: 'fassets',
          },
          {
            _key: '3',
            title: 'Flare Data Connector Docs',
            url: 'https://dev.flare.network/fdc/overview',
            icon: 'connector',
          },
          {
            _key: '4',
            title: 'Flare Time Series Oracle Docs',
            url: 'https://dev.flare.network/ftso/overview',
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
            url: 'https://flarescan.com/',
            isExternal: true,
          },
          {
            _key: '2',
            title: 'Flare Block Explorer',
            url: 'https://flare-explorer.flare.network/',
            isExternal: true,
          },
          {
            _key: '3',
            title: 'Flare Systems Explorer',
            url: 'https://flare-systems-explorer.flare.network/',
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
            title: 'Network Configuration',
            url: 'https://dev.flare.network/network/overview#configuration',
          },
          {
            _key: '2',
            title: 'Run an RPC Node',
            url: 'https://dev.flare.network/run-node/rpc-node',
          },
          {
            _key: '3',
            title: 'Run a Validator Node',
            url: 'https://dev.flare.network/run-node/validator-node',
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
            url: '/news/category/past-events',
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

export const secondaryNavData: SecondaryNavigation = [
  {
    _key: '1',
    title: 'terms and conditions',
    url: '/privacy-policy',
  },
]
