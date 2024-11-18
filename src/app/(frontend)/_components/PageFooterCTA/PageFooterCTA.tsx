import cx from 'classnames'
import { Media, SocialLink } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import PageFooterImage from './components/PageFooterImage'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string | null,
  buttonLink?: string | null,
  buttonSecondaryText?: string,
  buttonSecondaryLink?: string,
  backgroundImage?: (number | null) | Media
  backgroundImageStyle: ('flipped' | 'offset') | null
  socialMediaButtons?: (number | SocialLink)[] | null
  useSocialMediaButtons?: boolean | null
}

export default function PageFooterCTA({
  className,
  buttonText,
  buttonLink,
  buttonSecondaryText,
  buttonSecondaryLink,
  backgroundImage,
  backgroundImageStyle,
  socialMediaButtons,
  useSocialMediaButtons,
}: PageFooterCTAProps) {
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
            socialMediaButtons && socialMediaButtons.map((socialMediaButton: any) => {
              const {
                id, title, url, icon,
              } = socialMediaButton
              return (
                <Link
                  key={`${id}-${title}`}
                  href={url}
                  aria-label={`Go to ${title}`}
                  className={cx(styles.Button, styles.Button__icon)}
                >
                  <Image
                    src={icon.url}
                    alt={icon.alt}
                    width={24}
                    height={24}
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
