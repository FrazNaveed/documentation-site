import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import DiagonalArrow from '../svgs/DiagonalArrow'
import Flare from '../svgs/Flare'
import Platform from '../svgs/Platform'
import WalletConnect from '../svgs/WalletConnect'
import styles from './WalletsGridBlock.module.scss'

export default function WalletsGridBlock({ intro, wallets }: any) {
  console.log('intro ', intro)
  return (
    <div className={styles.walletsGridBlock}>
      <div className={styles.walletsGridIntro}>
        lexical it up
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
                  <DiagonalArrow className={styles.walletLinkArrow} />
                </Link>
              </div>
              {flrFunctionality && (
                <span className={styles.walletFlrFunctionalityWrap}>
                  <Flare />
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
                {/* {walletConnect ? (
                  <span className={cx(styles.walletConnect, styles.walletConnect__on)}>
                    <WalletConnect className={styles.walletConnect_on}/>
                    <p>Yes</p>
                  </span>
                ) : (
                  <span className={styles.walletConnect}>
                    <WalletConnect />
                    <p>No</p>
                  </span>
                )} */}
                <span className={styles.walletConnectWrap}>
                  <WalletConnect className={cx({ [styles.walletConnect__on]: walletConnect })} />
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
