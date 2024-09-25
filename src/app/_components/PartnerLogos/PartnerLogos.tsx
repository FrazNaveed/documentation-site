import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import cx from 'classnames'
import { Media } from 'src/payload-types'
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
        let imageWidth = width
        let imageHeight = height
        if (mimeType !== 'image/svg+xml') {
          imageWidth = width && width / 2
          imageHeight = height && height / 2
        }
        return (
          <div key={id} className={styles.imgWrap}>
            <Image
              className={styles.img}
              src={url}
              width={imageWidth ? imageWidth : undefined}
              height={imageHeight ? imageHeight : undefined}
              alt={alt}
            />
          </div>
        )
      })}
    </div>
  )
}
