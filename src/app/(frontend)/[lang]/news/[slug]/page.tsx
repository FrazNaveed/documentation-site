import Link from 'next/link'
import { notFound } from 'next/navigation'
import Hero from 'src/app/(frontend)/_components/Hero'
import Calendar from 'src/app/(frontend)/_components/svgs/Calendar'
import LeftArrow from 'src/app/(frontend)/_components/svgs/LeftArrow'
import Discord from 'src/app/(frontend)/_components/svgs/Discord'
import TelegramCircle from 'src/app/(frontend)/_components/svgs/TelegramCircle'
import XSocial from 'src/app/(frontend)/_components/svgs/XSocial'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import Pill from 'src/app/(frontend)/_components/Pill'
import { getNewsBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import convertToDate from 'src/app/(frontend)/_utils/convertToDate'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import type { Media } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const news = await getNewsBySlug(params.slug)

  const newsPost = news[0]
  if (!newsPost) {
    notFound()
  }
  const {
    title,
    publishDate,
    type,
    subtype,
    logos: featuredPostLogos,
    content,
  } = newsPost
  let typeHeroBgImage
  if (typeof type === 'object') {
    typeHeroBgImage = type.image
  }
  const subTypeHeroBgImage = subtype && typeof subtype === 'object' ? subtype.image : undefined

  return (
    <article>
      <Hero
        heroStyle='standard'
        backgroundImage={subTypeHeroBgImage as Media || typeHeroBgImage as Media}
        {...(featuredPostLogos ? { logos: featuredPostLogos.map((logo) => logo.image as Media) } : {})}
      />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <header className={styles.header}>
            <Link href={getCollectionPath('news')} className={styles.backLink}>
              <LeftArrow />
              Back to All News
            </Link>
            {title && <h1 className={styles.title}>{title}</h1>}
            <div className={styles.meta}>
              {type && typeof type === 'object' && <Pill text={type.title} size='small' />}
              {publishDate && (
                <time className={styles.date} dateTime={publishDate}>
                  <Calendar />
                  {convertToDate(publishDate)}
                </time>
              )}
            </div>
          </header>
          <div className={styles.social}>
            <div className={styles.socialInner}>
              <XSocial />
              <Discord />
              <TelegramCircle />
            </div>
          </div>
          <div className={styles.contentCol}>
            {content && <LexicalRenderer content={content as PayloadLexicalReactRendererContent} />}
          </div>
        </div>
      </div>
    </article>
  )
}
