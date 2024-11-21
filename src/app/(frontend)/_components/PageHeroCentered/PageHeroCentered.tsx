import Image from 'next/image'
import cx from 'classnames'
import type { PageHeroProtocolInfo, PageHero, Media } from '@/payload-types'
import Button from 'src/app/(frontend)/_components/Button'
import FlareLogo from 'src/app/(frontend)/_components/svgs/FlareLogo'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
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
  logo,
  text,
  protocolInfo,
  lang,
}: PageHeroCenteredProps) {
  let hasProtocolInfo
  let protocolMarkup
  if (protocolInfo) {
    const {
      providers,
      feeds,
      stakeTokens,
      stakeValue,
      averageBlockTime,
    } = protocolInfo
    hasProtocolInfo = typeof providers === 'number' || typeof feeds === 'number' || typeof stakeTokens === 'number' || typeof stakeValue === 'number' || typeof averageBlockTime === 'number'
    protocolMarkup = (
      <>
        {providers && (
          <div className={styles.protocol_Section}>
            <p className={styles.protocol_SectionLabel}>
              Data Providers
            </p>
            <p className={styles.protocol_Data}>{providers}</p>
          </div>
        )}
        {feeds && (
          <div className={styles.protocol_Section}>
            <p className={styles.protocol_SectionLabel}>
              Live Feeds
            </p>
            <p className={styles.protocol_Data}>{feeds}</p>
          </div>
        )}
        {(stakeTokens || stakeValue) && (
          <div className={cx(styles.protocol_Section, styles.protocol_Section__noShrink)}>
            <p className={styles.protocol_SectionLabel}>
              Flare Staked
            </p>
            <p className={styles.protocol_Data}>
              <span className={cx(styles.protocol_DataSpan, styles.protocol_DataSpan__dt)}>
                <FlareLogo className={styles.protocol_DataLogo} />
                {stakeTokens && `${formatNumber(stakeTokens, lang)} `}
                {stakeValue && `(${formatNumber(stakeValue, lang, true)})`}
              </span>
              <span className={styles.protocol_DataSpan__mobile}>
                {stakeValue && formatNumber(stakeValue, lang, true)}
              </span>
            </p>
          </div>
        )}
        {averageBlockTime && (
          <div className={styles.protocol_Section}>
            <p className={styles.protocol_SectionLabel}>
              Average Block Time
            </p>
            <p className={styles.protocol_Data}>{`${averageBlockTime}s`}</p>
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
          <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />
        </div>
      )}
      {(cta || ctaSecondary) && (
        <div className={styles.buttons}>
          {cta && <Button text={cta.text} link={cta.link} />}
          {ctaSecondary && <Button text={ctaSecondary.text} link={ctaSecondary.link} buttonStyle='secondary' />}
        </div>
      )}
    </>
  )
  const videoMarkup = (modiferClas?: string) => (showBackgroundVideo ? (
    <div className={cx(styles.videoWrap, styles[`videoWrap__${modiferClas}`])}>
      <video className={cx(styles.video, styles[`video__${modiferClas}`])} autoPlay loop muted>
        <source src='/en/video/home_hero_left.mp4' type='video/mp4' />
      </video>
    </div>
  ) : null)
  return (
    <div className={cx(styles.container, { [styles.container__fullWidthMobile]: heroStyle === 'centered' })}>
      <div className={cx(styles.wrap, { [styles.wrap__hasProtocol]: hasProtocolInfo, [styles.wrap__centeredStyle]: heroStyle === 'centered' })}>
        <div className={styles.grid}>
          {videoMarkup('left')}
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
          {videoMarkup('right')}
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
