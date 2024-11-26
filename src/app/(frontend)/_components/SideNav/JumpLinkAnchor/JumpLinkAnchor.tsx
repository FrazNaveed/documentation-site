import cx from 'classnames'
import slugifyLinkText from '../utils/slugifyLinkText'
import styles from './JumpLinkAnchor.module.scss'

export type JumpLinkAnchorProps = {
  linkText: string
  index: number
  className?: string
}

export default function JumpLinkAnchor({ linkText, index, className }: JumpLinkAnchorProps) {
  const linkId = slugifyLinkText(linkText)

  return <div id={linkId} data-section-index={index} className={cx(styles.jumpLinkAnchor, className)} />
}
