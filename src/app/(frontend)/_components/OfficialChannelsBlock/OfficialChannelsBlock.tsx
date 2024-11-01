import type { OfficialChannelsBlock as OCBlock } from '@/payload-types'
import Image from 'next/image'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import Discord from '../svgs/Discord'
import Telegram from '../svgs/Telegram'
import XSocialSymbol from '../svgs/XSocialSymbol'
import YouTube from '../svgs/YouTube'
import ExternalLink from '../ExternalLink'
import LexicalRenderer from '../LexicalRenderer'
import styles from './OfficialChannelsBlock.module.scss'

export type OfficialChannelsBlockProps = {
  title?: OCBlock['title'],
  text?: OCBlock['text'],
  channels?: OCBlock['channels']
}

const iconMap = {
  Discord,
  Telegram,
  X: XSocialSymbol,
  YouTube,
}

export default function OfficialChannelsBlock({ title, text, channels }: OfficialChannelsBlockProps) {
  return (
    <section className={styles.wrap}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {text
        && (
          <div className={styles.text}>
            <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />
          </div>
        )}
      <div className={styles.channels} role='list'>
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
              aria-label={`Visit our ${channelTitle} channel`}
            >
              <div className={styles.card} role='listitem'>
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
