import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { Wallet, WalletsGrid } from '@/payload-types'
import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import FlareLogo from '../svgs/FlareLogo'
import Platform from '../svgs/Platform'
import WalletConnect from '../svgs/WalletConnect'
import WalletConnectBlue from '../svgs/WalletConnectBlue'
import styles from './WalletsGridBlock.module.scss'
import LexicalRenderer from '../LexicalRenderer'

export type WalletsGridBlockProps = {
  intro?: WalletsGrid['walletsGridIntro']
  wallets?: Wallet[] | null
}

export default function WalletsGridBlock({ intro, wallets }: WalletsGridBlockProps) {
  return (
    <div className={styles.walletsGridBlock}>
      <div className={styles.walletsGridIntro}>
        {intro && <LexicalRenderer content={intro} />}
      </div>
      <ul className={styles.walletsGridWrap}>
        {wallets?.map((wallet: Wallet) => {
          const {
            name,
            logo,
            walletLink,
            flrFunctionality,
            tags,
            platforms,
            walletConnect,
          } = wallet
          return (
            <li key={wallet.id} className={styles.wallet}>
              <Link
                href={walletLink}
                className={styles.walletLink}
              >
                <div className={styles.walletHeader}>
                  <p className='visuallyHidden'>{name}</p>
                  {logo && typeof logo === 'object' && logo.url
                  && (
                  <div className={styles.walletLogoWrap}>
                    <Image
                      src={logo.url}
                      alt={logo.alt}
                      width={logo.width ?? 0}
                      height={logo.height ?? 0}
                    />
                  </div>
                  )}
                  <DiagonalArrowSquare className={styles.walletArrow} />
                </div>
                {flrFunctionality && (
                <span className={styles.walletFlrFunctionalityWrap}>
                  <FlareLogo />
                  <p>FLR Functionality</p>
                </span>
                )}
                {tags && tags.length > 0 && (
                <div className={styles.walletTagsWrap}>
                  {tags.map((tag: string) => (
                    <p key={tag} className={styles.walletTag}>{tag}</p>
                  ))}
                </div>
                )}
                <div className={styles.walletFooter}>
                  {!!platforms?.length && (
                  <div className={styles.walletPlatformsWrap}>
                    <Platform />
                    {platforms?.map((platform: string) => (
                      <p key={platform} className={styles.walletPlatform}>{platform}</p>
                    ))}
                  </div>
                  )}
                  <span className={cx(styles.walletConnectWrap)}>
                    {walletConnect ? <WalletConnectBlue /> : <WalletConnect />}
                    <p className={styles.walletConnectText}>
                      {walletConnect ? 'Yes' : 'No'}
                    </p>
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
