import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import type { Locale } from 'src/app/i18n-config'
import EventsAllLink from 'src/app/(frontend)/_components/EventsAllLink'
import EventsFeaturedLabel from 'src/app/(frontend)/_components/EventsFeaturedLabel'
import EventsLocation from 'src/app/(frontend)/_components/EventsLocation'
import OfficialChannelsIcon from 'src/app/(frontend)/_components/OfficialChannelsIcon'
import { getFeaturedEvent, getEventGlobalSettings } from 'src/app/(frontend)/_lib/payload/eventsQueries'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { IMarqueeGallery } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import isValidSocialSlotInMarquee from 'src/app/(frontend)/_utils/isValidSocialSlotInMarquee'
import MarqueeGallerySection from './MarqueeGallerySection'
import styles from './MarqueeGallery.module.scss'

type MarqueeGalleryProps = IMarqueeGallery & {
  className?: string
  locale?: Locale
}

export default async function MarqueeGallery({
  title, cards, className, locale,
}: MarqueeGalleryProps) {
  const eventsPageLink = getCollectionPath('events')
  const eventsPageSlug = eventsPageLink.replace(/^\/|\/$/g, '')
  const featuredEvent = await getFeaturedEvent()
  const eventGlobalSettings = await getEventGlobalSettings(locale)
  const eventsPage = await getPageBySlug(eventsPageSlug)
  const eventsPageData = eventsPage[0] || {}
  const { hero: eventsPageHero } = eventsPageData
  const eventsBackgroundImage = eventsPageHero?.backgroundImage
  const eventEyebrow = featuredEvent
    ? (featuredEvent.featuredHeroEyebrow || featuredEvent.flareInvolvement)
    : eventGlobalSettings?.eventCardEyebrow
  const eventHeader = featuredEvent ? featuredEvent.title : eventGlobalSettings?.eventCardTitle
  const eventsCard = (
    <div key='eventsCard' className={cx(styles.card, styles.card__md, styles.card__events)}>
      <div className={cx(styles.eventContent, { [styles.eventContent__default]: !featuredEvent })}>
        {featuredEvent && <EventsFeaturedLabel textClassName={styles.featuredText} />}
        {eventEyebrow && <h4 className={styles.eventEyebrow}>{eventEyebrow}</h4>}
        {eventHeader && <h3 className={styles.eventHeader}>{eventHeader}</h3>}
        {featuredEvent && (
          <EventsLocation
            location={featuredEvent.location}
            country={featuredEvent.country}
            className={styles.eventLocation}
            iconClassName={styles.eventLocation_Icon}
            iconSmall
          />
        )}
      </div>
      {(eventsBackgroundImage && typeof eventsBackgroundImage === 'object' && eventsBackgroundImage?.url) && (
        <div className={styles.eventBgImgWrap}>
          <Image
            className={styles.eventBgImg}
            src={eventsBackgroundImage.url}
            width={eventsBackgroundImage.width ?? 0}
            height={eventsBackgroundImage.height ?? 0}
            alt={eventsBackgroundImage.alt}
          />
        </div>
      )}
      {!featuredEvent && (
        <div className={styles.hoverContent}>
          <EventsAllLink className={styles.eventLink} iconClassName={styles.eventLink_Icon} />
        </div>
      )}
    </div>
  )
  const cardMarkup = ((cards && cards.length > 0) && cards.map((card, index) => {
    let output
    const {
      id,
      isSocialLink,
      imageCard,
      socialChannel,
    } = card
    const isSmallCard = isValidSocialSlotInMarquee(index)
    const isMdCard = index % 10 === 4 || (index > 12 && index % 10 === 3)
    if (isSmallCard && isSocialLink && socialChannel && typeof socialChannel === 'object') {
      const {
        title: channelTitle,
        url: socialUrl,
        icon: socialIcon,
        followerCount,
      } = socialChannel
      const socialCardIcon = <OfficialChannelsIcon channelTitle={channelTitle} icon={socialIcon} />
      output = (
        <Link key={id} href={socialUrl} className={cx(styles.card, styles.card__sm, styles.card__social)}>
          <div className={styles.socialWrap}>
            {followerCount && (
              <span className={styles.socialText}>
                {followerCount}
              </span>
            )}
            {socialCardIcon && (
              <span className={styles.socialIcon}>
                {socialCardIcon}
              </span>
            )}
          </div>
        </Link>
      )
    } else if (imageCard) {
      const { image, titleOverlay, textOverlay } = imageCard
      output = (
        <figure
          key={id}
          className={cx(
            styles.card,
            {
              [styles.card__sm]: isSmallCard,
              [styles.card__md]: isMdCard,
            },
          )}
        >
          {(image && typeof image === 'object' && image?.url) && (
            <Image
              className={styles.card_Image}
              src={image.url}
              width={image.width ?? 0}
              height={image.height ?? 0}
              alt={image.alt}
            />
          )}
          {(titleOverlay || textOverlay) && (
            <figcaption
              className={cx(
                styles.hoverContent,
                {
                  [styles.hoverContent__smCard]: isSmallCard,
                  [styles.hoverContent__mdCard]: isMdCard,
                },
              )}
            >
              {titleOverlay && (
                <h3
                  className={cx(
                    styles.overlayTitle,
                    {
                      [styles.overlayTitle__sm]: isSmallCard,
                      [styles.overlayTitle__md]: isMdCard,
                    },
                  )}
                >
                  {titleOverlay}
                </h3>
              )}
              {textOverlay && (
                <div
                  className={cx(
                    styles.overlayText,
                    {
                      [styles.overlayText__sm]: isSmallCard,
                      [styles.overlayText__md]: isMdCard,
                    },
                  )}
                >
                  <LexicalRenderer content={textOverlay as PayloadLexicalReactRendererContent} />
                </div>
              )}
            </figcaption>
          )}
        </figure>
      )
    }
    return output
  }))
  if (!cardMarkup) {
    return null
  }
  cardMarkup.splice(4, 0, eventsCard)
  const marqueeMarkup = (
    <MarqueeGallerySection>
      {cardMarkup}
    </MarqueeGallerySection>
  )
  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.intro}>
        <h2 className={styles.header}>
          {title}
        </h2>
      </div>
      <div className={styles.fullWidth}>
        <div className={styles.marqueeContainer}>
          {marqueeMarkup}
          {marqueeMarkup}
        </div>
      </div>
    </div>
  )
}
