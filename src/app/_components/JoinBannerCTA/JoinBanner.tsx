import cx from 'classnames'
import type { PillProps } from '../Pill/Pill'
import Pill from '../Pill';
import styles from './JoinBanner.module.scss'

export type CTAProps = {
  header: string
  text?: string | null
  link: string
  className?: string
  button: PillProps
}

export default function JoinBannerCTA({ header, text, button, className }: CTAProps) {
  return (
    <section className={cx(styles.joinBanner, className)}>
      <h1 className={cx(styles.header)}>{header}</h1>
      <p className={cx(styles.text)}>{text}</p>
      <Pill text={button.text} link={button.link} size={button.size} className={cx(styles.Button)} />
    </section>
  )
}
