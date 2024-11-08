import Image from 'next/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { codeToHtml } from 'shiki'
// eslint-disable-next-line camelcase
import { IBM_Plex_Mono } from 'next/font/google'
import cx from 'classnames'
import type { ICodeCta } from '@/payload-types'
import Button from 'src/app/(frontend)/_components/Button'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import CodeCTATabs from './CodeCTATabs'
import CodeCTACopyButton from './CodeCTACopyButton'
import codeExamples from './codeExamples'
import styles from './CodeCTABlock.module.scss'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export type CodeCTABlockProps = ICodeCta & {
  className?: string
}

export default async function CodeCTABlock({
  header,
  text,
  buttonText,
  buttonLink,
  buttonSecondaryText,
  buttonSecondaryLink,
  hideCode,
  image,
  className,
}: CodeCTABlockProps) {
  const hasButton = buttonText && buttonLink
  const hasSecondaryButton = buttonSecondaryText && buttonSecondaryLink
  const hasTextContent = header || text || hasButton || hasSecondaryButton
  const showImage = hideCode && image && typeof image === 'object' && image.url
  if (!hasTextContent && hideCode && !showImage) {
    return null
  }
  return (
    <section className={cx(styles.wrap, className)}>
      <div className={cx(styles.grid, { [styles.grid__withImage]: showImage })}>
        {hasTextContent && (
          <div className={styles.contentCol}>
            {header && <h3 className={styles.header}>{header}</h3>}
            {text && (
              <div className={styles.text}>
                <LexicalRenderer content={text as PayloadLexicalReactRendererContent} />
              </div>
            )}
            {(hasButton || hasSecondaryButton) && (
              <div className={styles.buttons}>
                {hasButton && <Button text={buttonText} link={buttonLink} />}
                {hasSecondaryButton && <Button text={buttonSecondaryText} link={buttonSecondaryLink} buttonStyle='secondary' />}
              </div>
            )}
          </div>
        )}
        {!hideCode && (
          <div className={styles.codeCol}>
            <CodeCTATabs labels={codeExamples.map((codeExample) => codeExample.language)} />
            <div className={styles.codeExamples}>
              {codeExamples.map(async (codeExample, i) => {
                const codeHighlighted = await codeToHtml(codeExample.code, {
                  lang: codeExample.languageId,
                  theme: 'github-light',
                })
                return (
                  <div key={codeExample.language} className={cx(styles.codeWrap, styles[`codeWrap__${i}`])}>
                    <div
                      id={`code-cta-tabpanel-${i}`}
                      className={cx(styles.code, ibmPlexMono.className)}
                      dangerouslySetInnerHTML={{ __html: codeHighlighted }}
                      role='tabpanel'
                      aria-labelledby={`code-cta-tab-${i}`}
                    />
                    <CodeCTACopyButton codeToCopy={codeExample.code} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {(showImage && image.url) && (
          <div className={styles.imageWrap}>
            <Image
              className={styles.image}
              src={image.url}
              width={image.width ?? 0}
              height={image.height ?? 0}
              alt={image.alt}
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
