import Image from 'next/image'
import cx from 'classnames'
import type { PageHeroProtocolInfo, PageHero, Media } from '@/payload-types'
import Button from 'src/app/(frontend)/_components/Button'
import Link from 'src/app/(frontend)/_components/Link'
import FlareLogo from 'src/app/(frontend)/_components/svgs/FlareLogo'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { Locale } from 'src/app/i18n-config'
import styles from './PageHeroCentered.module.scss'

export type PageHeroCenteredProps = {
  heroStyle: 'centered' | 'protocol'
  backgroundImage?: Media
  showBackgroundVideo?: PageHero['showBackgroundVideo']
  header?: string | null
  eyebrow?: string | null
  hideEyebrow?: PageHero['hideEyebrow']
  cta?: {
    text: string
    link: string
  }
  ctaSecondary?: {
    text: string
    link: string
  }
  ctaText?: {
    text: string
    link: string
  }
  logo?: PageHero['logo']
  text?: PageHero['text']
  protocolInfo?: PageHeroProtocolInfo
  lang: Locale
}

const formatNumber = (number: number, lang: Locale, isCurrency = false) => {
  const formatterBaseOptions: Intl.NumberFormatOptions = {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }
  let formatterOptions = formatterBaseOptions
  if (isCurrency) {
    formatterOptions = {
      style: 'currency',
      currency: 'USD',
      ...formatterBaseOptions,
    }
  }
  const compactFormatter = new Intl.NumberFormat(lang, formatterOptions)
  return compactFormatter.format(number)
}

export default function PageHeroCentered({
  heroStyle = 'centered',
  backgroundImage,
  showBackgroundVideo,
  header,
  eyebrow,
  hideEyebrow,
  cta,
  ctaSecondary,
  ctaText,
  logo,
  text,
  protocolInfo,
  lang,
}: PageHeroCenteredProps) {
  let hasProtocolInfo
  let protocolMarkup
  if (protocolInfo) {
    const {
      providersLabelIcon,
      providersLabelOverride,
      providers,
      providersUnit,
      feedsLabelIcon,
      feedsLabelOverride,
      feeds,
      tokensLabelIcon,
      tokensLabelOverride,
      stakeTokens,
      stakeValue,
      averageBlockTimeLabelIcon,
      averageBlockTimeLabelOverride,
      averageBlockTime,
      averageBlockTimeUnit,
    } = protocolInfo
    hasProtocolInfo = heroStyle === 'protocol' && (typeof providers === 'number' || typeof feeds === 'number' || typeof stakeTokens === 'number' || typeof stakeValue === 'number' || typeof averageBlockTime === 'number')
    const blockTimeUnitDisplay = averageBlockTimeUnit || 's'
    const providerUnitDisplay = providersUnit || ''
    const stakeValueFormatted = stakeValue && formatNumber(stakeValue, lang, true)
    const getLabelMarkup = (label?: string | null, defaultLabel?: string, icon?: number | Media | null) => (
      <p className={styles.protocol_SectionLabel}>
        {icon && typeof icon === 'object' && icon.url && (
          <Image
            className={styles.protocol_SectionLabelIcon}
            src={icon.url}
            width={icon.width ?? 0}
            height={icon.height ?? 0}
            alt={icon.alt}
          />
        )}
        {label || defaultLabel}
      </p>
    )
    protocolMarkup = (
      <>
        {providers && (
          <div className={styles.protocol_Section}>
            {getLabelMarkup(providersLabelOverride, 'Data Providers', providersLabelIcon)}
            <p className={styles.protocol_Data}>{`${providers}${providerUnitDisplay}`}</p>
          </div>
        )}
        {feeds && (
          <div className={styles.protocol_Section}>
            {getLabelMarkup(feedsLabelOverride, 'Live Feeds', feedsLabelIcon)}
            <p className={styles.protocol_Data}>{formatNumber(feeds, lang)}</p>
          </div>
        )}
        {(stakeTokens || stakeValue) && (
          <div className={cx(styles.protocol_Section, styles.protocol_Section__noShrink)}>
            {getLabelMarkup(tokensLabelOverride, 'Flare Staked', tokensLabelIcon)}
            <p className={styles.protocol_Data}>
              <span className={cx(styles.protocol_DataSpan, styles.protocol_DataSpan__dt)}>
                <FlareLogo className={styles.protocol_DataLogo} />
                {stakeTokens && `${formatNumber(stakeTokens, lang)} `}
                {(stakeValue && stakeTokens) ? `(${stakeValueFormatted})` : stakeValueFormatted}
              </span>
              <span className={styles.protocol_DataSpan__mobile}>
                {stakeValue && stakeValueFormatted}
              </span>
            </p>
          </div>
        )}
        {averageBlockTime && (
          <div className={styles.protocol_Section}>
            {getLabelMarkup(averageBlockTimeLabelOverride, 'Average Block Time', averageBlockTimeLabelIcon)}
            <p className={styles.protocol_Data}>{`${averageBlockTime}${blockTimeUnitDisplay}`}</p>
          </div>
        )}
      </>
    )
  }
  const mainContent = (
    <>
      {header && <h1 className={styles.header}>{header}</h1>}
      {text && (
        <div className={styles.text}>
          <LexicalRenderer content={text} />
        </div>
      )}
      {(cta || ctaSecondary) && (
        <div className={styles.buttons}>
          {cta && <Button text={cta.text} link={cta.link} />}
          {ctaSecondary && <Button text={ctaSecondary.text} link={ctaSecondary.link} buttonStyle='secondary' />}
          {ctaText && <Link href={ctaText.link} className={styles.buttons_TextLink}>{ctaText.text}</Link>}
        </div>
      )}
    </>
  )
  const showVideos = showBackgroundVideo && heroStyle === 'centered'
  const mobileVideoMarkup = (modifierClass?: string) => (showVideos ? (
    <div className={cx(styles.videoWrap, styles[`videoWrap__${modifierClass}`])}>
      <video className={cx(styles.video, styles[`video__${modifierClass}`])} autoPlay muted playsInline>
        <source src='/en/video/home_hero_mobile_square.mp4' type='video/mp4' />
      </video>
    </div>
  ) : null)
  return (
    <div className={cx(styles.container, { [styles.container__fullWidthMobile]: heroStyle === 'centered' })}>
      <div className={cx(styles.wrap, { [styles.wrap__hasProtocol]: hasProtocolInfo, [styles.wrap__centeredStyle]: heroStyle === 'centered' })}>
        {showVideos && (
          <video className={cx(styles.video, styles.video__desktop)} autoPlay muted playsInline>
            <source src='/en/video/home_hero_desktop.mp4' type='video/mp4' />
          </video>
        )}
        <div className={styles.grid}>
          {backgroundImage?.url && (
            <Image
              className={cx(styles.bgImg, { [styles.bgImg__centeredStyle]: heroStyle === 'centered' })}
              src={backgroundImage.url}
              width={backgroundImage.width ?? 0}
              height={backgroundImage.height ?? 0}
              alt={backgroundImage.alt}
              priority
            />
          )}
          <div className={cx(styles.contentCol, { [styles.contentCol__hasProtocol]: hasProtocolInfo, [styles.contentCol__centeredStyle]: heroStyle === 'centered' })}>
            {logo && typeof logo === 'object' && logo.url && (
              <Image
                className={styles.logo}
                src={logo.url}
                width={logo.width ?? 0}
                height={logo.height ?? 0}
                alt={logo.alt}
                priority
              />
            )}
            {(eyebrow && !hideEyebrow) && <h2 className={styles.eyebrow}>{eyebrow}</h2>}
            <div className={cx(styles.content, { [styles.content__dt]: heroStyle === 'protocol' })}>
              {mainContent}
            </div>
          </div>
          {mobileVideoMarkup('bottom')}
          {hasProtocolInfo && (
            <div className={cx(styles.protocol, styles.protocol__dt)}>
              {protocolMarkup}
            </div>
          )}
        </div>
      </div>
      {heroStyle === 'protocol' && (
        <div className={cx(styles.content, styles.content__mobile)}>
          {mainContent}
        </div>
      )}
      {hasProtocolInfo && (
        <div className={cx(styles.protocol, styles.protocol__mobile)}>
          {protocolMarkup}
        </div>
      )}
    </div>
  )
}
