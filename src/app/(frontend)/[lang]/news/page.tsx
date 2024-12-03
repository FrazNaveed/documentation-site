import NewsPage from 'src/app/(frontend)/_components/NewsPage'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const metadata = buildMetadata({ title: 'News' }, 'News', 'news')
  return metadata
}

export default async function Page() {
  return <NewsPage />
}
