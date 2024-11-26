import { i18n } from '@/src/app/i18n-config'
import Image from 'next/image'
import Button from '../Button'
import styles from './NotFoundPage.module.scss'

const url = `/${i18n.defaultLocale}/404_image.png`

export default function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.imageWrap}>
        <Image
          src={url}
          alt='not found'
          width={625}
          height={592}
        />
      </div>
      <div className={styles.contentWrap}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subhead}>We&apos;re sorry.</h2>
        <p className={styles.text}>This page can not be found.</p>
        <Button
          text='Return Home'
          link='/'
        />
      </div>
    </div>
  )
}
