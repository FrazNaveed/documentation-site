import Image from 'next/image'
import cx from 'classnames'
import type { StaticImageData } from 'next/image'
import type { Media } from '@/payload-types'
import styles from './PartnerLogos.module.scss'

interface PartnerLogoMedia extends Omit<Media, 'url'> {
  url?: string | StaticImageData | null
}
export type PartnerLogosProps = {
  logos: PartnerLogoMedia[]
  stacked?: boolean
}

export default function PartnerLogos({ logos, stacked }: PartnerLogosProps) {
  if (!logos || logos.length === 0) {
    return null
  }
  return (
    <div className={cx(styles.wrap, { [styles.wrap__column]: stacked, [styles.wrap__row]: !stacked })}>
      {logos.map(({ id, url, width, height, alt, mimeType }) => {
        if (!url) {
          return null
        }
        let imageWidth = width ?? 0
        let imageHeight = height ?? 0
        if (mimeType !== 'image/svg+xml') {
          imageWidth =  imageWidth / 2
          imageHeight = imageHeight / 2
        }
        return (
          <div key={id} className={cx(styles.imgWrap, { [styles.imgWrap__row]: !stacked })}>
            <Image
              className={styles.img}
              src={url}
              width={imageWidth}
              height={imageHeight}
              alt={alt}
            />
          </div>
        )
      })}
    </div>
  )
}
