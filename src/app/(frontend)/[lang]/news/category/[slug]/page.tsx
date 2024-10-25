import NewsPage from 'src/app/(frontend)/_components/NewsPage'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return <NewsPage type={slug} />
}
