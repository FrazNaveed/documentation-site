import cx from 'classnames'
import { Media } from '@/payload-types'
import Link from 'next/link'
import PageFooterImage from './components/PageFooterImage'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'
import OfficialChannelsIcon from '../OfficialChannelsIcon'
import { getGlobalSocialChannels } from '../../_lib/payload/pageQueries'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string | null,
  buttonLink?: string | null,
  buttonSecondaryText?: string,
  buttonSecondaryLink?: string,
  backgroundImage?: (number | null) | Media
  backgroundImageStyle: ('flipped' | 'offset') | null
  selectSocialChannels?: string[] | null
  useSocialMediaButtons?: boolean | null
  lang: 'en' | 'es' | 'de' | undefined
}

interface ISocialChannel {
  title: string;
  url: string;
  followerCount: number | null;
}

interface IGlobalSocialChannels {
  [key: string]: ISocialChannel;
}

interface SocialChannel {
  discord: { title: string; url: string; followerCount?: string | null };
  github: { title: string; url: string; followerCount?: string | null };
  linkedin: { title: string; url: string; followerCount?: string | null };
  medium: { title: string; url: string; followerCount?: string | null };
  telegram: { title: string; url: string; followerCount?: string | null };
  x: { title: string; url: string; followerCount?: string | null };
  youtube: { title: string; url: string; followerCount?: string | null };
  updatedAt?: string | null;
  createdAt?: string | null;
}

interface GlobalSocialChannels {
  discord?: SocialChannel['discord'];
  github?: SocialChannel['github'];
  linkedin?: SocialChannel['linkedin'];
  medium?: SocialChannel['medium'];
  telegram?: SocialChannel['telegram'];
  x?: SocialChannel['x'];
  youtube?: SocialChannel['youtube'];
}

function filterAndOrderSocialChannels(
  globalSocialChannels: GlobalSocialChannels,
  selectSocialChannels: PageFooterCTAProps['selectSocialChannels'] | null,
): Array<{ key: keyof GlobalSocialChannels; title: string; url: string; followerCount?: string | null | undefined}> {
  if (!globalSocialChannels || !selectSocialChannels) return []

  return selectSocialChannels
    .map((key) => {
      const channel = globalSocialChannels[key as keyof GlobalSocialChannels]
      if (channel) {
        return {
          key,
          ...channel,
        }
      }
      return null
    })
    .filter((channel): channel is { key: keyof GlobalSocialChannels; title: string; url: string; followerCount?: string | null | undefined } => channel !== null)
}

export default async function PageFooterCTA({
  className,
  buttonText,
  buttonLink,
  buttonSecondaryText,
  buttonSecondaryLink,
  backgroundImage,
  backgroundImageStyle,
  selectSocialChannels,
  useSocialMediaButtons,
  lang,
}: PageFooterCTAProps) {
  const globalSocialChannels: GlobalSocialChannels | null = await getGlobalSocialChannels(lang)
  const safeGlobalSocialChannels = globalSocialChannels || {
    discord: { title: '', url: '', followerCount: null },
    github: { title: '', url: '', followerCount: null },
    linkedin: { title: '', url: '', followerCount: null },
    medium: { title: '', url: '', followerCount: null },
    telegram: { title: '', url: '', followerCount: null },
    x: { title: '', url: '', followerCount: null },
    youtube: { title: '', url: '', followerCount: null },
  }
  const socialMediaChannels = filterAndOrderSocialChannels(safeGlobalSocialChannels, selectSocialChannels)

  return (
    <section className={cx(styles.Wrap, { [styles.Wrap__hasSocialMediaButtons]: useSocialMediaButtons }, className)}>
      <div className={cx(
        styles.content,
        { [styles.content__hasSecondary]: buttonSecondaryLink && buttonSecondaryText && !useSocialMediaButtons },
        { [styles.content__hasSocialMediaButtons]: useSocialMediaButtons },
      )}
      >
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='left' hasSocialMediaButtons={useSocialMediaButtons} />
        <div className={cx(styles.buttonWrap, { [styles.buttonWrap__socialMediaButtons]: useSocialMediaButtons })}>
          {useSocialMediaButtons ? (
            socialMediaChannels?.map((socialMediaChannel) => {
              const {
                key,
                title,
                url,
              } = socialMediaChannel
              return (
                <Link
                  key={key}
                  href={url}
                  aria-label={`Go to ${title}`}
                  className={cx(styles.Button, styles.Button__icon)}
                >
                  <OfficialChannelsIcon
                    channelTitle={key}
                  />
                </Link>
              )
            })
          )
            : (
              [
                { text: buttonText, link: buttonLink, buttonStyle: 'pink' as const },
                { text: buttonSecondaryText, link: buttonSecondaryLink, buttonStyle: 'secondary' as const },
              ].map(({ text, link, buttonStyle }) => text && link && (
              <Button
                key={text}
                text={text}
                link={link}
                size='large'
                buttonStyle={buttonStyle}
                className={styles.Button}
              />
              ))
            )}
        </div>
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='right' hasSocialMediaButtons={useSocialMediaButtons} />
      </div>
    </section>
  )
}
