import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { i18n } from './app/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    (negotiatorHeaders[key] = value)
  })

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  // console.log('matchLocale: ', matchLocale(languages, locales, i18n.defaultLocale))

  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow direct access to the Payload admin panel and its assets
  if (pathname.startsWith('/admin') || pathname.startsWith('/_payload')) {
    const pathWithoutDefaultLocale = pathname.replace(new RegExp(`^/${i18n.defaultLocale}(/|$)`), '/')

    return NextResponse.rewrite(new URL(pathWithoutDefaultLocale, request.url))
  }

  if (['/favicon.ico'].includes(pathname)) {
    return
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // console.warn('path is missing the locale: ', pathname)
    // console.log('the locale is: ', locale)

    return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url))
  }

  // Handle default locale
  if (pathname.startsWith(`/${i18n.defaultLocale}`)) {
    const pathWithoutDefaultLocale = pathname.replace(new RegExp(`^/${i18n.defaultLocale}(/|$)`), '/')

    // console.warn('contains default locale --> remove the locale from the pathname')
    // console.log('Rewriting URL without locale...')
    // console.log('path without default locale ', pathWithoutDefaultLocale)
    const rewrittenUrl = new URL(pathWithoutDefaultLocale, request.url)
    // console.log('rewritten url: ', rewrittenUrl.href)

    return NextResponse.rewrite(new URL(pathWithoutDefaultLocale, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
