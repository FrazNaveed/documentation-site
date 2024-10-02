import Link from 'next/link'
import cx from 'classnames'
import styles from './Button.module.scss'

export type ButtonProps = {
  text: string,
  link?: string,
  className?: string,
  buttonStyle?: 'pink' | 'black' | 'secondary',
  size?: 'large' | 'medium' | 'small',
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  text, link, className, buttonStyle = 'pink', size = 'medium', disabled, onClick,
}: ButtonProps) {
  const linkClasses = cx(
    styles.Button,
    styles[buttonStyle],
    styles[size],
    className,
  )

  return (
    link ? (
      <Link href={link} className={linkClasses}>
        <span className={styles.text}>{text}</span>
      </Link>
    ) : <button type='submit' className={cx(linkClasses, styles.text)} disabled={disabled} onClick={onClick}>{text}</button> 
  )
}
