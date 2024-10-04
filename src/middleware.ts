import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import { i18n } from './app/i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { url } from 'inspector'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string | string[]> = {}
  request.headers.forEach((value, key) => (
    negotiatorHeaders[key] = value
  ))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const defaultLocale = i18n.defaultLocale

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  const locale = matchLocale(languages, locales, defaultLocale)

  console.log('locale var from getLocale: ', locale)

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('pathname: ', pathname)

  if (
    [
      '/favicon.ico',
    ].includes(pathname)
  ) {
    return
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => {
      return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    })

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    console.warn('path is missing the locale: ', pathname)
    console.log('THE locale: ', locale)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      )
    )
  }


  // if (pathname.startsWith('/' + i18n.defaultLocale)) {
  //   console.warn('contains default locale --> remove the locale from the pathname')
  //   console.log('Rewriting URL without locale...')
  //   const urlWithoutLocale = pathname.replace(/^\/en/, '')
  //   console.log('cropped: ', urlWithoutLocale)
  //   const foo = NextResponse.rewrite(new URL(urlWithoutLocale, request.url))
  //   console.log('rewritten url: ', foo)
  //   return NextResponse.rewrite(new URL(urlWithoutLocale, request.url))
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
