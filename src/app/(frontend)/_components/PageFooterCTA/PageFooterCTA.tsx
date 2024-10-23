import cx from 'classnames'
import { Media } from '@/payload-types'
import PageFooterImage from './components/PageFooterImage'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string,
  buttonLink?: string,
  buttonSecondaryText?: string,
  buttonSecondaryLink?: string,
  backgroundImage?: (number | null) | Media
  backgroundImageStyle: ('flipped' | 'offset') | null
}

export default function PageFooterCTA({
  className,
  buttonText,
  buttonLink,
  buttonSecondaryText,
  buttonSecondaryLink,
  backgroundImage,
  backgroundImageStyle,
}: PageFooterCTAProps) {
  return (
    <section className={cx(styles.Wrap, className)}>
      <div className={cx(styles.content, [buttonSecondaryLink && buttonSecondaryText && styles.content__hasSecondary])}>
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='left' />
        <div className={styles.buttonWrap}>
          {[
            { text: buttonText, link: buttonLink, buttonStyle: 'pink' },
            { text: buttonSecondaryText, link: buttonSecondaryLink, buttonStyle: 'secondary' },
          ].map(({ text, link, buttonStyle }) => text && link && (
          <Button
            key={text}
            text={text}
            link={link}
            size='large'
            buttonStyle={buttonStyle as 'pink' | 'black' | 'secondary'}
            className={styles.Button}
          />
          ))}
        </div>
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='right' />
      </div>
    </section>
  )
}
