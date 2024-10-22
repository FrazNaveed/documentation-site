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
      <div className={styles.content}>
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='left' />
        <div className={styles.buttonWrap}>
          {buttonText && buttonLink
            && (
              <Button
                text={buttonText}
                link={buttonLink}
                size='large'
                className={styles.Button}
              />
            )}
          {buttonSecondaryText && buttonSecondaryLink
            && (
              <Button
                text={buttonSecondaryText}
                link={buttonSecondaryLink}
                size='large'
                buttonStyle='secondary'
                className={styles.Button}
              />
            )}
        </div>
        <PageFooterImage backgroundImage={backgroundImage} backgroundImageStyle={backgroundImageStyle} backgroundImagePosition='right' />
      </div>
    </section>
  )
}
