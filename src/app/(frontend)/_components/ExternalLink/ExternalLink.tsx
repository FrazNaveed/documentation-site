import Link from 'next/link'
import cx from 'classnames'
import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import styles from './ExternalLink.module.scss'

type ExternalLinkProps = {
  href: string
  className?: string
  iconClassName?: string
}

export default function ExternalLink({
  href, className, iconClassName, children, ...rest
}: React.PropsWithChildren<ExternalLinkProps>) {
  return (
    <Link href={href} className={cx(styles.linkWrap, className)} {...rest}>
      <span className={styles.wrap}>
        {children}
        <DiagonalArrowSquare className={cx(styles.arrow, iconClassName)} />
      </span>
    </Link>
  )
}
