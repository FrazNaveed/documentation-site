import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import FlareLogo from '../svgs/FlareLogo'
import Platform from '../svgs/Platform'
import WalletConnect from '../svgs/WalletConnect'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import styles from './WalletsGridBlock.module.scss'
import LexicalRenderer from '../LexicalRenderer'

export default function WalletsGridBlock({ intro, wallets }: any) {
  return (
    <div className={styles.walletsGridBlock}>
      <div className={styles.walletsGridIntro}>
        {intro && <LexicalRenderer content={intro as PayloadLexicalReactRendererContent} />}
      </div>
      <ul className={styles.walletsGridWrap}>
        {wallets.map((wallet: any) => {
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
              <div className={styles.walletHeader}>
                <p className='visuallyHidden'>{name}</p>
                <div>
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    width={50}
                    height={50}
                  />
                </div>
                <Link
                  href={walletLink}
                >
                  <DiagonalArrowSquare />
                </Link>
              </div>
              {flrFunctionality && (
                <span className={styles.walletFlrFunctionalityWrap}>
                  <FlareLogo />
                  <p>FLR Functionality</p>
                </span>
              )}
              {tags && (
                <div className={styles.walletTagsWrap}>
                  {tags.map((tag: string) => (
                    <p key={tag} className={styles.walletTag}>{tag}</p>
                  ))}
                </div>
              )}
              <div className={styles.walletFooter}>
                {platforms && (
                  <div className={styles.walletPlatformsWrap}>
                    <Platform />
                    {platforms.map((platform: string) => (
                      <p key={platform} className={styles.walletPlatform}>{platform}</p>
                    ))}
                  </div>
                )}
                <span className={cx(styles.walletConnectWrap, { [styles.walletConnect__on]: walletConnect })}>
                  <WalletConnect />
                  <p className={styles.walletConnectText}>
                    {walletConnect ? 'Yes' : 'No'}
                  </p>
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
