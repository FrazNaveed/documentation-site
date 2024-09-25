import PartnerLogos from '../../_components/PartnerLogos'
import BlockdaemonLogo from 'public/testing-delete-me/blockdaemonLogo.svg'
import CryptoTVLogo from 'public/testing-delete-me/cryptoTVLogo.png'
import FlareLogo from 'public/testing-delete-me/flareLogo.svg'
import FTSOLogo from 'public/testing-delete-me/FTSOLogo.svg'
import GoogleCloudLogo from 'public/testing-delete-me/GoogleCloudLogo.png'
import styles from './page.module.scss'

const logo1 = {
  id: 1,
  alt: 'blockdaemon logo',
  updatedAt: '',
  createdAt: '',
  url: BlockdaemonLogo,
  mimeType: 'image/svg+xml',
  width: 144,
  height: 33,
}

const logo2 = {
  id: 2,
  alt: 'Crypto TV logo',
  updatedAt: '',
  createdAt: '',
  url: CryptoTVLogo,
  mimeType: 'image/png',
  width: 127,
  height: 127,
}

const logo3 = {
  id: 3,
  alt: 'Falre logo',
  updatedAt: '',
  createdAt: '',
  url: FlareLogo,
  mimeType: 'image/svg+xml',
  width: 71,
  height: 25,
}

const logo4 = {
  id: 4,
  alt: 'FTSO logo',
  updatedAt: '',
  createdAt: '',
  url: FTSOLogo,
  mimeType: 'image/svg+xml',
  width: 88,
  height: 28,
}

const logo5 = {
  id: 5,
  alt: 'Google Cloud logo',
  updatedAt: '',
  createdAt: '',
  url: GoogleCloudLogo,
  mimeType: 'image/png',
  width: 281,
  height: 44,
}

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Partner Logos</h1>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo1, logo2]} stacked />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo2]} stacked />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo3, logo1]} stacked />
      </div>
      <div className={styles.logoWrap} style={{ height: 100 }}>
        <PartnerLogos logos={[logo3, logo5, logo1]} stacked />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo3, logo5, logo1]} stacked />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo1, logo2]} />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo4, logo5]} />
      </div>
      <div className={styles.logoWrap}>
        <PartnerLogos logos={[logo4, logo5, logo1]} />
      </div>
      <div className={styles.logoWrap} style={{ width: 600 }}>
        <PartnerLogos logos={[logo4, logo5, logo1]} />
      </div>
    </div>
  )
}
