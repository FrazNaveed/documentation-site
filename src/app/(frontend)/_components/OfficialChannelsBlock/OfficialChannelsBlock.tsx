import type { OfficialChannelsBlock as OCBlock } from '@/payload-types'
import Image from 'next/image'
import Discord from '../svgs/Discord'
import Telegram from '../svgs/Telegram'
import XSocial from '../svgs/XSocial'
import YouTube from '../svgs/YouTube'
import ExternalLink from '../ExternalLink'
import styles from './OfficialChannelsBlock.module.scss'

export type OfficialChannelsBlockProps = {
  title?: OCBlock['title'],
  channels?: OCBlock['channels']
}

const iconMap = {
  Discord,
  Telegram,
  X: XSocial,
  YouTube,
}

export default function OfficialChannelsBlock({ title, channels }: OfficialChannelsBlockProps) {
  return (
    <section className={styles.wrap}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.channels}>
        {channels?.map((channel) => {
          if (typeof channel === 'number') return null

          const {
            title: channelTitle,
            url,
            icon,
            id,
          } = channel

          const Icon = iconMap[channelTitle as keyof typeof iconMap]

          let cardIcon

          if (icon && typeof icon !== 'number') {
            cardIcon = icon.url
              && <Image src={icon.url} alt={icon.alt} width={icon.width ?? 0} height={icon.height ?? 0} />
          } else if (Icon) {
            cardIcon = <Icon />
          } else {
            cardIcon = null
          }

          return (
            <ExternalLink
              href={url}
              key={id}
              className={styles.channel}
            >
              <div className={styles.card}>
                {cardIcon && <span className={styles.channelIcon}>{cardIcon}</span>}
                <span className={styles.channelTitle}>{channelTitle}</span>
              </div>
            </ExternalLink>
          )
        })}
      </div>
    </section>
  )
}
