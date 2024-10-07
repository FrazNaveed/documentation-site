import cx from 'classnames'
import Button from '../Button'
import styles from './PageFooterCTA.module.scss'

export type PageFooterCTAProps = {
  className?: string,
  buttonText?: string,
  buttonLink?: string
}

export default function PageFooterCTA({ className, buttonText, buttonLink }: PageFooterCTAProps) {
  return (
    <section className={cx(styles.Wrap, className)}>
      <div className={styles.content}>
        <div>
          foo
        </div>
        {buttonText && buttonLink
          && (
            <Button
              text={buttonText}
              link={buttonLink}
              size='large'
              className={styles.Button}
            />
          )}
        <div>
          bar
        </div>
      </div>
    </section>
  )
}
