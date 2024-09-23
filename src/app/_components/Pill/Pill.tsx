import Link from 'next/link'
import cx from 'classnames'
import styles from './Pill.module.scss'

export type PillProps = {
  text: string,
  link?: string,
  className?: string,
  size?: 'medium' | 'small',
  active?: boolean
}

export default function Pill({
  text, link, className, size = 'medium', active,
}: PillProps) {
  const linkClasses = cx(
    styles.Pill,
    styles[size],
    className,
    {
      [styles.active]: active,
      [styles.isLink]: link!! && !active,
    }
  )

  return (
    link ? (
      <Link href={link} className={linkClasses}>
        <span className={styles.text}>{text}</span>
      </Link>
    ) : (
      <div className={linkClasses}>
        <span className={styles.text}>{text}</span>
      </div>
    )
  )
}
