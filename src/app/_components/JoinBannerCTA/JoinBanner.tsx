import cx from 'classnames'
import type { ButtonProps } from '../Button/Button'
import Button from '../Button'
import styles from './JoinBanner.module.scss'

export type CTAProps = {
  header: string
  text?: string | null
  className?: string
  button: ButtonProps
}

export default function JoinBannerCTA({ header, text, button, className }: CTAProps) {
  return (
    <section className={cx(styles.joinBanner, className)}>
      <h1 className={cx(styles.header)}>{header}</h1>
      <p className={cx(styles.text)}>{text}</p>
      <Button
        text={button.text}
        link={button.link}
        className={styles.button}
        buttonStyle='secondary'
      />
    </section>
  )
}
