import cx from 'classnames'
import type { OfficialChannelsBlock as OCBlock } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from '../LexicalRenderer/LexicalRenderer'
import { getGlobalSocialChannels } from '../../_lib/payload/pageQueries'
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

interface ISocialChannel {
  title: string;
  url: string;
  followerCount: number | null;
}

interface IGlobalSocialChannels {
  [key: string]: ISocialChannel;
}

function filterAndOrderSocialChannels(
  globalSocialChannels: IGlobalSocialChannels,
  selectSocialChannels: OfficialChannelsBlockProps['selectSocialChannels'] | null,
): Array<ISocialChannel & { key: string }> {
  if (!selectSocialChannels) return []

  return selectSocialChannels
    .map((key) => {
      const channel = globalSocialChannels[key]
      if (channel) {
        return {
          key,
          ...channel,
        }
      }
      return null
    })
    .filter((channel): channel is ISocialChannel & { key: string } => channel !== null)
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
            <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />
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
