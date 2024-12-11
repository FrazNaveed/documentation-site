'use client'

import { TelegramShareButton, TwitterShareButton, XIcon } from 'react-share'
import { baseUrl } from 'src/environment'
import TelegramCircle from 'src/app/(frontend)/_components/svgs/TelegramCircle'
import styles from './SocialShare.module.scss'

type SocialShareProps = {
  slug: string
}

export default function SocialShare({ slug }: SocialShareProps) {
  const shareUrl = `${baseUrl}/${slug}`
  return (
    <div className={styles.social}>
      <div className={styles.socialInner}>
        <TwitterShareButton url={shareUrl}>
          <XIcon round />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl}>
          <TelegramCircle />
        </TelegramShareButton>
      </div>
    </div>
  )
}
