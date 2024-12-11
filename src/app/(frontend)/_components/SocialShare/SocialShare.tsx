'use client'

import { TelegramShareButton, TwitterShareButton, XIcon } from 'react-share'
import { baseUrl } from 'src/environment'
import TelegramCircle from 'src/app/(frontend)/_components/svgs/TelegramCircle'
import styles from './SocialShare.module.scss'

type SocialShareProps = {
  slug: string
  title?: string | null
}

export default function SocialShare({ slug, title }: SocialShareProps) {
  const shareUrl = `${baseUrl}/${slug}`
  return (
    <div className={styles.social}>
      <div className={styles.socialInner}>
        <TwitterShareButton url={shareUrl} title={title ?? undefined} aria-label='Share on X'>
          <XIcon round />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl} title={title ?? undefined} aria-label='Share on Telegram'>
          <TelegramCircle />
        </TelegramShareButton>
      </div>
    </div>
  )
}
