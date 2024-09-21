import Link from 'next/link'
import DiagonalArrow from '../svgs/DiagonalArrow'
import styles from './ExternalLink.module.scss'

type ExternalLinkProps = {
  href: string
  className?: string
  iconClassName?: string
}

export default function ExternalLink({ href, className, iconClassName, children }: React.PropsWithChildren<ExternalLinkProps>) {
  return (
    <Link href={href} className={className}>
      <span className={styles.wrap}>
        {children}
        <DiagonalArrow className={iconClassName} />
      </span>
    </Link>
  )
}
