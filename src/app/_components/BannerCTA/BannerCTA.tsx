import cx from 'classnames'
import type { ButtonProps } from '../Button/Button'
import Button from '../Button'
import styles from './BannerCTA.module.scss'

export type CTAProps = {
  header: string
  text?: string | null
  className?: string
  button: ButtonProps
}

export default function BannerCTA({ header, text, button, className }: CTAProps) {
  return (
    <section className={cx(styles.joinBanner, className)}>
      <h1 className={styles.header}>{header}</h1>
      <div className={styles.rightColumn}>
        <p className={styles.text}>{text}</p>
        <Button
          text={button.text}
          link={button.link}
          className={styles.button}
          buttonStyle='secondary'
        />
      </div>
    </section>
  )
}
