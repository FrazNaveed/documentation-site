import { Page } from '@/payload-types'
import Link from 'next/link'
import cx from 'classnames'
import styles from './PrevNextLinks.module.scss'

export type PrevNextLinksProps = {
  prevLink?: number | Page | null
  nextLink?: number | Page | null
  linkType?: string | null
}

export default function PrevNextLinks({ prevLink, nextLink, linkType }: PrevNextLinksProps) {
  const prevTitle = prevLink && typeof prevLink === 'object' && prevLink.title ? prevLink.title : null
  const nextTitle = nextLink && typeof nextLink === 'object' && nextLink.title ? nextLink.title : null
  const prevSlug = prevLink && typeof prevLink === 'object' && prevLink.slug ? prevLink.slug : null
  const nextSlug = nextLink && typeof nextLink === 'object' && nextLink.slug ? nextLink.slug : null

  const linkTypeText = linkType && linkType !== '' ? linkType : 'Guide'

  return prevTitle || nextTitle ? (
    <div className={styles.wrap}>
      {prevTitle && prevSlug && (
        <Link href={`/${prevSlug}`} className={cx(styles.link, styles.prev)}>
          <h6 className={styles.label}>{`Previous ${linkTypeText}`}</h6>
          <p className={styles.title}>{prevTitle}</p>
        </Link>
      )}
      {nextTitle && nextSlug && (
        <Link href={`/${nextSlug}`} className={cx(styles.link, styles.next)}>
          <h6 className={styles.label}>{`Next ${linkTypeText}`}</h6>
          <p className={styles.title}>{nextTitle}</p>
        </Link>
      )}
    </div>
  ) : null
}
