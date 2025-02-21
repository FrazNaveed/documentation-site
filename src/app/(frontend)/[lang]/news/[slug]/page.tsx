import Link from 'next/link'
import { notFound } from 'next/navigation'
import Hero from 'src/app/(frontend)/_components/Hero'
import Calendar from 'src/app/(frontend)/_components/svgs/Calendar'
import LeftArrow from 'src/app/(frontend)/_components/svgs/LeftArrow'
import SocialShare from 'src/app/(frontend)/_components/SocialShare'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import Pill from 'src/app/(frontend)/_components/Pill'
import RelatedPosts from 'src/app/(frontend)/_components/RelatedPosts'
import { getNewsArchive, getNewsBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import convertToDate from 'src/app/(frontend)/_utils/convertToDate'
import getCollectionPath from 'src/app/(frontend)/_utils/getCollectionPath'
import type { Media, News } from '@/payload-types'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function getNewsPostData(slug: string) {
  const news = await getNewsBySlug(slug)
  const newsPost = news[0]
  if (!newsPost) {
    notFound()
  }
  return newsPost
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const newsPost = await getNewsPostData(slug)
  const metadata = buildMetadata(newsPost.meta, newsPost.title, slug)
  return metadata
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const newsPost = await getNewsPostData(slug)
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

  const relatedBackfill = relatedPosts?.length ? 3 - relatedPosts.length : 3
  const relatedNews = relatedPosts as News[] | null | undefined

  if (relatedBackfill && relatedBackfill > 0) {
    const related = await getNewsArchive(relatedBackfill, 1, [id], typeof type === 'object' ? type.id : undefined)
    if (related) {
      relatedNews?.push(...related.docs)
    }
  }

  let typeHeroBgImage
  if (typeof type === 'object') {
    typeHeroBgImage = type.image
  }
  const subTypeHeroBgImage = subtype && typeof subtype === 'object' ? subtype.image : undefined

  return (
    <article className={styles.article}>
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
          <SocialShare slug={slug} title={title} />
          <div className={styles.contentCol}>
            {content && <LexicalRenderer content={content} />}
          </div>
        </div>
      </div>
      <footer>
        {relatedNews && relatedNews.length > 0 && (
          <RelatedPosts posts={relatedNews} />
        )}
      </footer>
    </article>
  )
}
