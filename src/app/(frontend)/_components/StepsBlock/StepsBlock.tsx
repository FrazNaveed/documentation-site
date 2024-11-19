import cx from 'classnames'
import type { IStepsBlock } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './StepsBlock.module.scss'

export type StepsBlockProps = IStepsBlock & {
  className?: string
}

export default function StepsBlock({
  title, steps, className,
}: StepsBlockProps) {
  if (!title && (!steps || steps.length === 0)) {
    return null
  }
  return (
    <section className={cx(styles.grid, className)}>
      <div className={styles.wrap}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {steps && steps.length > 0 && (
          <div className={styles.steps}>
            {steps.map((step) => {
              const { id, title: stepTitle, description } = step
              return (
                <div key={id} className={styles.step}>
                  <h3 className={styles.step_Title}>
                    {stepTitle}
                  </h3>
                  {description && (
                    <div className={styles.step_Descrip}>
                      <LexicalRenderer content={description as PayloadLexicalReactRendererContent} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
