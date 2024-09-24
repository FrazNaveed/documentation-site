interface NavigationItem {
  _key: string
  title: string
  url: string
}

type FooterNavigation = NavigationItem[]

interface SecondaryNavigationItem extends NavigationItem {
  isExternal?: boolean
}

type SecondaryNavigation = SecondaryNavigationItem[]

export const navData: FooterNavigation = [
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

export const secondaryNavLabel = 'Dev Links'

export const secondaryNavData: SecondaryNavigation = [
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
