'use client'

import { ValidationError, type TUseForm } from '@formspree/react'
import type { FieldValues } from '@formspree/core'
import cx from 'classnames'
import styles from '../FormBlock.module.scss'

export type ContactFormProps = {
  formId: string
  state: TUseForm<FieldValues>[0]
}

export default function ContactForm({ formId, state }: ContactFormProps) {
  return (
    <>
      <p className={styles.sectionLabel}>
        Your Contact Info
      </p>
      <div className={cx(styles.formSection, styles.formSection__col1)}>
        <label htmlFor={`name${formId}`}>
          <span className={styles.label}>Your name*:</span>
          <input placeholder='Your Name*' id={`name${formId}`} type='text' name='name' aria-required='true' required />
        </label>
        <ValidationError field='name' prefix='Your Name' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2)}>
        <label htmlFor={`projectOrTeam${formId}`}>
          <span className={styles.label}>Project or Team*:</span>
          <input placeholder='Project or Team*' id={`projectOrTeam${formId}`} type='text' name='projectOrTeam' aria-required='true' required />
        </label>
        <ValidationError field='projectOrTeam' prefix='Project or Team' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col1)}>
        <label htmlFor={`email${formId}`}>
          <span className={styles.label}>Your email*:</span>
          <input placeholder='Your email*' id={`email${formId}`} type='email' name='email' aria-required='true' required />
        </label>
        <ValidationError field='email' prefix='Email' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2)}>
        <label htmlFor={`website${formId}`}>
          <span className={styles.label}>Website:</span>
          <input placeholder='Website' id={`website${formId}`} type='text' name='website' />
        </label>
        <ValidationError field='website' prefix='Website' errors={state.errors} className={styles.error} />
      </div>
      <p className={styles.sectionLabel}>
        Support Type
      </p>
      <div className={cx(styles.formSection, styles.formSection__col1)}>
        <label htmlFor={`productType${formId}`}>
          <span className={styles.label}>Product Type:</span>
          <div className='customSelect'>
            <select name='productType' id={`productType${formId}`} defaultValue=''>
              <option value=''>
                Product Type
              </option>
              <option value='Integrate Flare Time Series Oracle (FTSO)'>
                Integrate Flare Time Series Oracle (FTSO)
              </option>
              <option value='Integrate Flare Data Connector (FDC)'>
                Integrate Flare Data Connector (FDC)
              </option>
              <option value='Integrate FAssets'>
                Integrate FAssets
              </option>
              <option value='Integrate Flare Network'>
                Integrate Flare Network
              </option>
            </select>
          </div>
        </label>
        <ValidationError field='productType' prefix='Product Type' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2)}>
        <label htmlFor={`estimatedLaunch${formId}`}>
          <span className={styles.label}>Estimated Launch:</span>
          <div className='customSelect'>
            <select name='estimatedLaunch' id={`estimatedLaunch${formId}`} defaultValue=''>
              <option value=''>
                Estimated Launch
              </option>
              <option value='Within 1 month'>
                Within 1 month
              </option>
              <option value='1 - 3 Months'>
                1 - 3 Months
              </option>
              <option value='3 - 6 Months'>
                3 - 6 Months
              </option>
              <option value='6+ Months'>
                6+ Months
              </option>
              <option value='Already Live'>
                Already Live
              </option>
            </select>
          </div>
        </label>
        <ValidationError field='estimatedLaunch' prefix='Estimated Launch' errors={state.errors} className={styles.error} />
      </div>
      <p className={styles.sectionLabel}>
        Additional Comments / Notes
      </p>
      <div className={cx(styles.formSection, styles.formSection__colWide)}>
        <label htmlFor={`notesOrComments${formId}`}>
          <span className={styles.label}>Optional notes:</span>
          <textarea placeholder='Optional notes' id={`notesOrComments${formId}`} name='notesOrComments' rows={6} />
        </label>
        <ValidationError field='notesOrComments' prefix='Optional notes' errors={state.errors} className={styles.error} />
      </div>
    </>
  )
}
