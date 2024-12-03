import cx from 'classnames'
import { ITokenLinkBlock } from '@/payload-types'
import Image from 'next/image'
import Link from '../ExternalLink'
import styles from './TokenLinkBlock.module.scss'

export type TokenLinkBlockProps = ITokenLinkBlock & {
  className?: string
}

export default function TokenLinkBlock({
  tokenLinks,
  className,
}: TokenLinkBlockProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      <div className={styles.linkWrap}>
        {tokenLinks?.map((link) => {
          const {
            title,
            link: url,
            icon,
            id,
          } = link
          return (
            url && (
            <Link
              key={id}
              href={url}
              className={styles.link}
            >
              {icon && typeof icon === 'object' && icon.url && (
                <Image
                  src={icon.url}
                  alt={icon.alt}
                  width={icon.width ?? 0}
                  height={icon.height ?? 0}
                  className={styles.linkIcon}
                />
              )}
              <div className={styles.linkText}>
                {title}
              </div>
            </Link>
            )
          )
        })}
      </div>
    </section>
  )
}
