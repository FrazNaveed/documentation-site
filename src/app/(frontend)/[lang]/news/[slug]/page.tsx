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
import { getNewsArchive, getNewsBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import convertToDate from 'src/app/(frontend)/_utils/convertToDate'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import type { Media, News } from '@/payload-types'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './page.module.scss'
import TeaserGrid from '../../../_components/TeaserGrid'

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
    id,
    title,
    publishDate,
    type,
    subtype,
    logos: featuredPostLogos,
    content,
    relatedPosts,
  } = newsPost

  const relatedBackfill = (relatedPosts?.length && 3 - relatedPosts.length)
  const relatedNews = relatedPosts as News[] | null | undefined

  if (relatedBackfill && relatedBackfill > 0) {
    const related = await getNewsArchive(relatedBackfill, 1, [id], typeof type === 'object' ? type?.name : undefined)
    relatedNews?.push(...related.docs)
  }

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
              {type && typeof type === 'object' && <Pill text={type.name} size='small' />}
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
      <footer>
        {relatedNews && relatedNews.length > 0 && (
          <div className={styles.relatedNews}>
            <h5 className={styles.relatedNewsHeader}>Related News</h5>
            {/* BUG: Depth doesn't seem to fetch any curated posts featured thumbnails, filing separate issue */}
            <TeaserGrid teasers={relatedNews} />
          </div>
        )}
      </footer>
    </article>
  )
}
