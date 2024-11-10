import { News } from '@/payload-types'

export default function Slide({
  id, title, slug,
}: News) {
  return (
    <div key={id}>
      {title}
      {slug}
    </div>
  )
}
