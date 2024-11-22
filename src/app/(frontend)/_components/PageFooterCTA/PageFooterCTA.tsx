import cx from 'classnames'
import { Media } from '@/payload-types'
import Link from 'next/link'
import PageFooterImage from './components/PageFooterImage'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'
import OfficialChannelsIcon from '../OfficialChannelsIcon'
import { getGlobalSocialChannels } from '../../_lib/payload/pageQueries'
import filterAndOrderSocialChannels, { IGlobalSocialChannels } from '../../_utils/filterAndOrderSocialChannels'

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
  const globalSocialChannels: IGlobalSocialChannels = await getGlobalSocialChannels(lang)
  const socialMediaChannels = filterAndOrderSocialChannels(globalSocialChannels, selectSocialChannels)

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
              if (!url) {
                console.warn('Invalid social channel url. Check Url field is filled out in Global > Social Channels collection for', key)
                return null
              }
              return (
                <Link
                  key={key}
                  href={url}
                  aria-label={`Go to ${title || 'Social Media'}`}
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
