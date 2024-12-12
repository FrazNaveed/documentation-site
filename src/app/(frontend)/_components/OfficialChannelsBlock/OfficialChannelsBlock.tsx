import cx from 'classnames'
import type { OfficialChannelsBlock as OCBlock } from '@/payload-types'
import { getGlobalSocialChannels } from '../../_lib/payload/pageQueries'
import filterAndOrderSocialChannels, { IGlobalSocialChannels } from '../../_utils/filterAndOrderSocialChannels'
import OfficialChannelsIcon from '../OfficialChannelsIcon'
import ExternalLink from '../ExternalLink'
import LexicalRenderer from '../LexicalRenderer'
import styles from './OfficialChannelsBlock.module.scss'

export type OfficialChannelsBlockProps = {
  title?: OCBlock['title'],
  text?: OCBlock['text'],
  selectSocialChannels?: string[] | null,
  lang: 'en' | 'es' | 'de' | undefined,
  className?: string,
}

export default async function OfficialChannelsBlock({
  title, text, lang, selectSocialChannels, className,
}: OfficialChannelsBlockProps) {
  const globalSocialChannels: IGlobalSocialChannels = await getGlobalSocialChannels(lang)
  const socialMediaChannels = filterAndOrderSocialChannels(globalSocialChannels, selectSocialChannels)

  return (
    <section className={cx(styles.wrap, className)}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {text
        && (
          <div className={styles.text}>
            <LexicalRenderer content={text} />
          </div>
        )}
      <div className={styles.channels} role='list'>
        {socialMediaChannels?.map((socialMediaChannel) => {
          if (typeof socialMediaChannel === 'number') return null

          const {
            key,
            title: channelTitle,
            url,
          } = socialMediaChannel

          const cardIcon = <OfficialChannelsIcon channelTitle={key} />

          return (
            <ExternalLink
              href={url}
              key={key}
              className={styles.channel}
              iconClassName={styles.channelArrow}
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
