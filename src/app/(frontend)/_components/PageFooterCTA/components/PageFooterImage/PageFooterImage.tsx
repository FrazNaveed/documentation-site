import cx from 'classnames'
import Image from 'next/image'
import { Media } from '@/payload-types'
import styles from './PageFooterImage.module.scss'

type PageFooterImageProps = {
  backgroundImage?: (number | null) | Media
  backgroundImageStyle?: ('flipped' | 'offset') | null
  backgroundImagePosition: 'left' | 'right'
};

export default function PageFooterImage({
  backgroundImage,
  backgroundImageStyle,
  backgroundImagePosition,
}: PageFooterImageProps) {
  if (!backgroundImage || typeof backgroundImage !== 'object' || !backgroundImage.url) {
    return null
  }

  return (
    <div className={styles.ImageWrap}>
      <Image
        src={backgroundImage.url}
        width={276}
        height={276}
        alt={backgroundImage.alt}
        className={cx(
          styles[`bgImg__${backgroundImagePosition}`],
          styles[`bgImg__${backgroundImageStyle}`],
        )}
      />
    </div>
  )
}
