import Button from 'src/app/(frontend)/_components/Button'
import type { Event } from '@/payload-types'

export type EventsButtonProps = {
  button: Event['button']
  className?: string
}

export default function EventsButton({ button, className }: EventsButtonProps) {
  const { buttonType, link } = button || {}
  if (!buttonType || !link) {
    return null
  }
  return (
    <Button
      className={className}
      link={link}
      text={buttonType === 'rsvp' ? 'RSVP' : 'Announcement'}
      buttonStyle={buttonType === 'rsvp' ? 'pink' : 'secondary'}
    />
  )
}
