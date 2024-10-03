import type { News } from '@/payload-types'
import PlayButton from '../svgs/PlayButton'

export type ContentTypeIconProps = {
  contentType?: News['contentType']
  className?: string
}

const thumbnailIcons = {
  video: <PlayButton />,
  podcast: null,
}

export default function ContentTypeIcon({ contentType, className }: ContentTypeIconProps) {
  if (!contentType) {
    return null
  }
  return contentType && <div className={className}>{thumbnailIcons[contentType]}</div>
}
