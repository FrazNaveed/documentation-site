import type { SocialLink as ISocialLink } from '@/payload-types'
import Image from 'next/image'
import Discord from '../svgs/Discord'
import Telegram from '../svgs/Telegram'
import XSocialSymbol from '../svgs/XSocialSymbol'
import YouTube from '../svgs/YouTube'

export type OfficialChannelsIconProps = {
  channelTitle?: ISocialLink['title'],
  icon?: ISocialLink['icon']
}

const iconMap = {
  Discord,
  Telegram,
  X: XSocialSymbol,
  YouTube,
}

export default function OfficialChannelsIcon({ channelTitle, icon }: OfficialChannelsIconProps) {
  const Icon = iconMap[channelTitle as keyof typeof iconMap]

  let cardIcon

  if (icon && typeof icon !== 'number') {
    cardIcon = icon.url
      && <Image src={icon.url} alt={icon.alt} width={icon.width ?? 0} height={icon.height ?? 0} />
  } else if (Icon) {
    cardIcon = <Icon />
  } else {
    cardIcon = null
  }

  return cardIcon
}
