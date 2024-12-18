import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const metadata = buildMetadata({ title: 'Careers' }, 'Careers', 'careers')
  return metadata
}

export default async function Page() {
  return 'HI Careers landing page'
}
