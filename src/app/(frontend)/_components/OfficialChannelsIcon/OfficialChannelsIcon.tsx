import type { SocialLink as ISocialLink } from '@/payload-types'
import Discord from '../svgs/Discord'
import GitHub from '../svgs/GitHub'
import LinkedIn from '../svgs/LinkedIn'
import Medium from '../svgs/Medium'
import Telegram from '../svgs/Telegram'
import XSocialSymbol from '../svgs/XSocialSymbol'
import YouTube from '../svgs/YouTube'

export type OfficialChannelsIconProps = {
  channelTitle?: ISocialLink['title'],
  icon?: ISocialLink['icon'] // to remove
}

const iconMap = {
  discord: Discord,
  github: GitHub,
  linkedin: LinkedIn,
  medium: Medium,
  telegram: Telegram,
  x: XSocialSymbol,
  youtube: YouTube,
}

export default function OfficialChannelsIcon({ channelTitle, icon }: OfficialChannelsIconProps) {
  const Icon = iconMap[channelTitle as keyof typeof iconMap]
  console.log(icon)

  let cardIcon

  if (Icon) {
    cardIcon = <Icon />
  } else {
    cardIcon = null
  }

  return cardIcon
}
