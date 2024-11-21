import cx from 'classnames'
import Image from 'next/image'
import { Media } from '@/payload-types'
import styles from './PageFooterImage.module.scss'

type PageFooterImageProps = {
  backgroundImage?: (number | null) | Media
  backgroundImageStyle?: ('flipped' | 'offset') | null
  backgroundImagePosition: 'left' | 'right'
  hasSocialMediaButtons?: boolean | null | undefined
};

export default function PageFooterImage({
  backgroundImage,
  backgroundImageStyle,
  backgroundImagePosition,
  hasSocialMediaButtons,
}: PageFooterImageProps) {
  if (!backgroundImage || typeof backgroundImage !== 'object' || !backgroundImage.url) {
    return null
  }

  return (
    <div className={cx(styles.ImageWrap, { [styles.ImageWrap__hasSocialMediaButtons]: hasSocialMediaButtons })}>
      <Image
        src={backgroundImage.url}
        width={276}
        height={276}
        alt={backgroundImage.alt}
        className={cx(
          styles[`bgImg__${backgroundImagePosition}`],
          styles[`bgImg__${backgroundImageStyle}`],
          { [styles.bgImg__hasSocialMediaButtons]: hasSocialMediaButtons },
        )}
      />
    </div>
  )
}
