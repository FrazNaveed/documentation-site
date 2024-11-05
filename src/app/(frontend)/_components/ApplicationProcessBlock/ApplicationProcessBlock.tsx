import cx from 'classnames'
import type { ApplicationProcess } from '@/payload-types'
import LexicalRenderer from 'src/app/(frontend)/_components/LexicalRenderer'
import type { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import styles from './ApplicationProcessBlock.module.scss'

export default function ApplicationProcessBlock({ title, steps }: ApplicationProcess) {
  const stepsWithNumbers = steps?.map((step, index) => ({ ...step, stepNumber: index + 1 })) || []
  const stepCount = stepsWithNumbers.length
  const stepsHalfCount = Math.max(1, Math.floor(stepCount / 2))
  const stepsSet1 = stepsWithNumbers.slice(0, stepsHalfCount)
  const stepsSet2 = stepsWithNumbers.slice(stepsHalfCount, stepCount)
  const stepMarkup = (stepsToOutput: typeof stepsWithNumbers) => (
    stepsToOutput?.map((step) => {
      const {
        id,
        title: stepTitle,
        description,
        stepNumber,
      } = step
      return (
        <div key={id} className={styles.step}>
          <h3 className={styles.step_Title}>
            <div className={cx(styles.step_TitleColor, styles[`step_TitleColor__${stepNumber}`])} />
            <span>
              {`${stepNumber}. ${stepTitle}`}
            </span>
          </h3>
          {description && (
            <div className={styles.step_Descrip}>
              <LexicalRenderer content={description as PayloadLexicalReactRendererContent} />
            </div>
          )}
        </div>
      )
    })
  )
  return (
    <section>
      {title && <h2 className={styles.title}>{title}</h2>}
      {stepsWithNumbers.length > 0 && (
        <div className={styles.graphic}>
          {stepsWithNumbers.map((step) => {
            const {
              id,
              title: stepTitle,
              graphicTitle,
              graphicText,
              stepNumber,
            } = step
            return (
              <div key={id} className={styles.graphic_Section}>
                <div className={styles.graphic_SectionLabel}>
                  <span className={styles.graphic_SectionLabelInner}>
                    <span>
                      {`${stepNumber}. `}
                    </span>
                    <span>
                      {graphicTitle || stepTitle}
                    </span>
                  </span>
                </div>
                {graphicText && (
                  <div className={styles.graphic_Text}>
                    {graphicText}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      <div className={styles.steps}>
        {stepsSet1.length > 0 && (
          <div className={cx(styles.stepCol, styles.stepCol__one)}>
            {stepMarkup(stepsSet1)}
          </div>
        )}
        {stepsSet2.length > 0 && (
          <div className={cx(styles.stepCol, styles.stepCol__two)}>
            {stepMarkup(stepsSet2)}
          </div>
        )}
      </div>
    </section>
  )
}
