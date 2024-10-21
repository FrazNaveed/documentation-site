import { CSSProperties } from 'react'
import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import ExternalLink from 'src/app/(frontend)/_components/ExternalLink'
import isUrlExternal from 'src/app/(frontend)/_utils/isUrlExternal'

interface LinkProps extends NextLinkProps {
  href: string
  rel?: string
  target?: string
  style?: CSSProperties
}

export default function Link({ href, children, ...rest }: React.PropsWithChildren<LinkProps>) {
  return isUrlExternal(href) ? (
    <ExternalLink href={href} {...rest}>
      {children}
    </ExternalLink>
  ) : (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  )
}
