import cx from 'classnames'
import { ITokenLinkBlock } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import isLexicalEmpty from 'src/app/(frontend)/_utils/isLexicalEmpty'
import RightArrow from '../svgs/RightArrow'
import styles from './TokenLinkBlock.module.scss'

export type TokenLinkBlockProps = ITokenLinkBlock & {
  className?: string
}

type TokenLink = NonNullable<ITokenLinkBlock['tokenLinks']>[0]

const getCardInnerMarkup = (title: TokenLink['title'], icon: TokenLink['icon'], isLink = false) => (
  <>
    {icon && typeof icon === 'object' && icon.url && (
      <Image
        src={icon.url}
        alt={icon.alt}
        width={icon.width ?? 0}
        height={icon.height ?? 0}
        className={styles.card_Icon}
      />
    )}
    <div className={styles.card_TextArrowWrap}>
      <div className={cx(styles.card_Text, { [styles.card_Text__link]: isLink })}>
        {title}
      </div>
      {isLink && <RightArrow className={styles.card_Arrow} />}
    </div>
  </>
)

export default function TokenLinkBlock({
  tokenLinks,
  richText,
  className,
}: TokenLinkBlockProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      {richText && !isLexicalEmpty(richText) && (
        <div className={styles.introText}>
          <LexicalRenderer content={richText} />
        </div>
      )}
      <div className={styles.cardsWrap}>
        {tokenLinks?.map((link) => {
          const {
            title,
            link: url,
            icon,
            id,
          } = link
          return (
            url ? (
              <Link key={id} href={url} className={cx(styles.card, styles.card__link)}>
                {getCardInnerMarkup(title, icon, true)}
              </Link>
            ) : (
              <div key={id} className={cx(styles.card, styles.card__nonlink)}>
                {getCardInnerMarkup(title, icon)}
              </div>
            )
          )
        })}
      </div>
    </section>
  )
}
