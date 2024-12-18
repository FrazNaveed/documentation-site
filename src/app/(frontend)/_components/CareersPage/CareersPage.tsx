import getCareersListings from '../../_lib/payload/careersQueries'

export default async function CareersPage() {
  const careers = await getCareersListings()
  console.log(careers)
  return (
    <div>
      Careers Landing Page Component
    </div>
  )
}
