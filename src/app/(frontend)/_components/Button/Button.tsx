import Link from 'next/link'
import cx from 'classnames'
import ExternalLink from 'src/app/(frontend)/_components/ExternalLink'
import styles from './Button.module.scss'

export type ButtonProps = {
  text: string,
  link?: string,
  linkExternal?: boolean,
  className?: string,
  buttonStyle?: 'pink' | 'black' | 'secondary',
  size?: 'large' | 'medium' | 'small',
  disabled?: boolean
  onBlur?: () => void,
  onFocus?: () => void,
  onClick?: () => void
}

export default function Button({
  text, link, linkExternal, className, buttonStyle = 'pink', size = 'medium', disabled, onBlur, onFocus, onClick,
}: ButtonProps) {
  const linkClasses = cx(
    styles.Button,
    styles[buttonStyle],
    styles[size],
    className,
  )

  const linkInner = (
    <span className={styles.text}>
      {text}
    </span>
  )

  const linkMarkup = linkExternal
    ? (
      <ExternalLink
        href={link as string}
        className={linkClasses}
        iconClassName={cx(styles.buttonIcon, styles[`buttonIcon__${buttonStyle}`])}
      >
        {linkInner}
      </ExternalLink>
    ) : (
      <Link href={link as string} className={linkClasses}>
        {linkInner}
      </Link>
    )

  return (
    link
      ? linkMarkup
      : <button type='submit' className={cx(linkClasses, styles.text)} disabled={disabled} onBlur={onBlur} onFocus={onFocus} onClick={onClick}>{text}</button>
  )
}
