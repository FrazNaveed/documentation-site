import cx from 'classnames'
import type { OfficialChannelsBlock as OCBlock } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import OfficialChannelsIcon from '../OfficialChannelsIcon'
import ExternalLink from '../ExternalLink'
import LexicalRenderer from '../LexicalRenderer'
import styles from './OfficialChannelsBlock.module.scss'

export type OfficialChannelsBlockProps = {
  title?: OCBlock['title'],
  text?: OCBlock['text'],
  channels?: OCBlock['channels'],
  className?: string,
}

export default function OfficialChannelsBlock({
  title, text, channels, className,
}: OfficialChannelsBlockProps) {
  return (
    <section className={cx(styles.wrap, className)}>
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

          const cardIcon = <OfficialChannelsIcon channelTitle={channelTitle} icon={icon} />

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
