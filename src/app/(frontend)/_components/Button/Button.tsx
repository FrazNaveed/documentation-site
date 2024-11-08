import Link from 'next/link'
import cx from 'classnames'
import ExternalLink from 'src/app/(frontend)/_components/ExternalLink'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'
import styles from './Button.module.scss'

export type ButtonProps = {
  text: string,
  link?: string,
  className?: string,
  buttonStyle?: 'pink' | 'black' | 'secondary',
  size?: 'large' | 'medium' | 'small',
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  onBlur?: () => void,
  onFocus?: () => void,
  onClick?: () => void
}

export default function Button({
  text, link, className, buttonStyle = 'pink', size = 'medium', disabled, type = 'button', onBlur, onFocus, onClick,
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

  const linkMarkup = isUrlExternal(link)
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
      : (
        <button
          // eslint-disable-next-line react/button-has-type
          type={type}
          className={cx(linkClasses, styles.text)}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
        >
          {text}
        </button>
      )
  )
}
