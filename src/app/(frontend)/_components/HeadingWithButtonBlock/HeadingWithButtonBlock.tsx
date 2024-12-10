import cx from 'classnames'
import type { IHeadingWithButton } from '@/payload-types'
import Button from 'src/app/(frontend)/_components/Button'
import styles from './HeadingWithButtonBlock.module.scss'

export type HeadingWithButtonBlockProps = IHeadingWithButton & {
  className?: string
}

export default function HeadingWithButtonBlock({
  heading, buttonText, buttonLink, className,
}: HeadingWithButtonBlockProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      {heading && <h2>{heading}</h2>}
      {buttonText && buttonLink && <Button text={buttonText} link={buttonLink} buttonStyle='secondary' />}
    </div>
  )
}
