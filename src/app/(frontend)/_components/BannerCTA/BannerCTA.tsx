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

export default function BannerCTA({
  header, text, button, className,
}: CTAProps) {
  return (
    <section className={styles.wrap}>
      <div className={cx(styles.banner, className)}>
        <h2 className={styles.header}>{header}</h2>
        <div className={styles.rightColumn}>
          {text && <p className={styles.text}>{text}</p>}
          <Button
            text={button.text}
            link={button.link}
            className={styles.button}
            buttonStyle='secondary'
          />
        </div>
      </div>
    </section>
  )
}
