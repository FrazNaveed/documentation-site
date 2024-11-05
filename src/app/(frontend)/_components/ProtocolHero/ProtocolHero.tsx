import Image from 'next/image'
import cx from 'classnames'
import type { PageHeroProtocolInfo, Media } from '@/payload-types'
import Button from 'src/app/(frontend)/_components/Button'
import FlareLogo from 'src/app/(frontend)/_components/svgs/FlareLogo'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import type { Locale } from 'src/app/i18n-config'
import styles from './ProtocolHero.module.scss'

export type ProtocolHeroProps = {
  backgroundImage?: Media
  header?: string | null
  eyebrow?: string | null
  cta?: {
    text: string
    link: string
  }
  ctaSecondary?: {
    text: string
    link: string
  }
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

export default function ProtocolHero({
  backgroundImage,
  header,
  eyebrow,
  cta,
  ctaSecondary,
  protocolInfo,
  lang,
}: ProtocolHeroProps) {
  const logo = protocolInfo?.logo
  const text = protocolInfo?.text
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
            <p className={styles.protocol_Data}>{averageBlockTime}</p>
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
  return (
    <div className={styles.container}>
      <div className={cx(styles.wrap, { [styles.wrap__hasProtocol]: hasProtocolInfo })}>
        <div className={styles.grid}>
          {backgroundImage?.url && (
            <Image
              className={styles.bgImg}
              src={backgroundImage.url}
              width={backgroundImage.width ?? 0}
              height={backgroundImage.height ?? 0}
              alt={backgroundImage.alt}
              priority
            />
          )}
          <div className={cx(styles.contentCol, { [styles.contentCol__hasProtocol]: hasProtocolInfo })}>
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
            {eyebrow && <h2 className={styles.eyebrow}>{eyebrow}</h2>}
            <div className={cx(styles.content, styles.content__dt)}>
              {mainContent}
            </div>
          </div>
          {hasProtocolInfo && (
            <div className={cx(styles.protocol, styles.protocol__dt)}>
              {protocolMarkup}
            </div>
          )}
        </div>
      </div>
      <div className={cx(styles.content, styles.content__mobile)}>
        {mainContent}
      </div>
      {hasProtocolInfo && (
        <div className={cx(styles.protocol, styles.protocol__mobile)}>
          {protocolMarkup}
        </div>
      )}
    </div>
  )
}
