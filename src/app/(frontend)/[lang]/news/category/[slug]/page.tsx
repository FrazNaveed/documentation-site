import NewsPage from 'src/app/(frontend)/_components/NewsPage'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  return <NewsPage type={params.slug} />
}
