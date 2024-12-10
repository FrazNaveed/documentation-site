import { CSSProperties } from 'react'
import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import cx from 'classnames'
import ExternalLink from 'src/app/(frontend)/_components/ExternalLink'
import RightArrow from 'src/app/(frontend)/_components/svgs/RightArrow'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'
import styles from './Link.module.scss'

interface LinkProps extends NextLinkProps {
  href: string
  rel?: string
  target?: string
  className?: string
  iconClassName?: string
  includeRightArrow?: boolean
  style?: CSSProperties
}

export default function Link({
  href, children, className, iconClassName, includeRightArrow, ...rest
}: React.PropsWithChildren<LinkProps>) {
  return isUrlExternal(href) ? (
    <ExternalLink href={href} className={className} iconClassName={iconClassName} {...rest}>
      {children}
    </ExternalLink>
  ) : (
    <NextLink href={href} className={cx(className, { [styles.link]: includeRightArrow })} {...rest}>
      {children}
      {includeRightArrow && <RightArrow className={cx(styles.link_Icon, iconClassName)} />}
    </NextLink>
  )
}
