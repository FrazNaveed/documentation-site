'use client'

import { useState } from 'react'
import { ValidationError, type TUseForm } from '@formspree/react'
import type { FieldValues } from '@formspree/core'
import cx from 'classnames'
import { COUNTRY_OPTIONS } from './countryOptions'
import styles from '../FormBlock.module.scss'

export type NewsletterSignupFormProps = {
  formId: string
  state: TUseForm<FieldValues>[0]
}

export default function NewsletterSignupForm({ formId, state }: NewsletterSignupFormProps) {
  const [profileValue, setProfileValue] = useState<string>('')
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileValue(e.target.value)
  }
  const specifyProfileHidden = profileValue !== 'Other'
  const companyHidden = !(
    profileValue === 'Web developer'
    || profileValue === 'Web3 infrastructure provider'
    || profileValue === 'Web3 VC / professional investor'
    || profileValue === 'Journalist'
  )
  const companySizeHidden = profileValue !== 'Web developer'
  const industryHidden = profileValue !== 'Web developer'
  return (
    <>
      <p className={styles.sectionLabel}>
        Your Contact Info
      </p>
      <div className={cx(styles.formSection, styles.formSection__col1)}>
        <label htmlFor={`email${formId}`}>
          <span className={styles.label}>Your email*:</span>
          <input placeholder='Your email*' id={`email${formId}`} type='email' name='email' aria-required='true' required />
        </label>
        <ValidationError field='email' prefix='Email' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2)}>
        <label htmlFor={`country${formId}`}>
          <span className={styles.label}>Country*:</span>
          <div className='customSelect'>
            <select name='MMERGE16' id={`country${formId}`} aria-required='true' required defaultValue=''>
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </label>
        <ValidationError field='MMERGE16' prefix='Country' errors={state.errors} className={styles.error} />
      </div>
      <p className={styles.sectionLabel}>
        Flare interests
      </p>
      <div className={cx(styles.formSection, styles.formSection__col1)}>
        <label htmlFor={`profile${formId}`}>
          <span className={styles.label}>Profile type:</span>
          <div className='customSelect'>
            <select onChange={handleProfileChange} name='EXPERIENCE' id={`profile${formId}`} defaultValue=''>
              <option value=''>
                Profile type
              </option>
              <option value='Web developer'>
                Web developer
              </option>
              <option value='Web3 enthusiast/ retail investor'>
                Web3 enthusiast/ retail investor
              </option>
              <option value='Web3 infrastructure provider'>
                Web3 infrastructure provider
              </option>
              <option value='Web3 VC / professional investor'>
                Web3 VC / professional investor
              </option>
              <option value='Journalist'>
                Journalist
              </option>
              <option value='Student'>
                Student
              </option>
              <option value='Other'>
                Other
              </option>
            </select>
          </div>
        </label>
        <ValidationError field='EXPERIENCE' prefix='Profile' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: companyHidden })}>
        <label htmlFor={`company${formId}`}>
          <span className={styles.label}>Company:</span>
          <input placeholder='Company' id={`company${formId}`} type='text' name='company' disabled={companyHidden} />
        </label>
        <ValidationError field='company' prefix='Company' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col1, { [styles.hide]: companySizeHidden })}>
        <label htmlFor={`companySize${formId}`}>
          <span className={styles.label}>Company Size:</span>
          <div className='customSelect'>
            <select name='companySize' id={`companySize${formId}`} defaultValue='' disabled={companySizeHidden}>
              <option value=''>
                Company Size
              </option>
              <option value='Just me'>
                Just me
              </option>
              <option value='Start-up'>
                Start-up
              </option>
              <option value='Scale-up'>
                Scale-up
              </option>
              <option value='Medium-size company'>
                Medium-size company
              </option>
              <option value='Enterprise'>
                Enterprise
              </option>
            </select>
          </div>
        </label>
        <ValidationError field='companySize' prefix='Company Size' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: industryHidden })}>
        <label htmlFor={`industry${formId}`}>
          <span className={styles.label}>Industry:</span>
          <div className='customSelect'>
            <select name='industry' id={`industry${formId}`} defaultValue='' disabled={industryHidden}>
              <option value=''>
                Industry
              </option>
              <option value='Web3 native'>
                Web3 native
              </option>
              <option value='Art'>
                Art
              </option>
              <option value='Construction and home improvement'>
                Construction and home improvement
              </option>
              <option value='Entertainment/Gaming'>
                Entertainment/Gaming
              </option>
              <option value='Financial services'>
                Financial services
              </option>
              <option value='Government/public service'>
                Government/public service
              </option>
              <option value='Health and Care'>
                Health and Care
              </option>
              <option value='Manufacturing/Agricultural'>
                Manufacturing/Agricultural
              </option>
              <option value='Professional services (consultancy, law practice, accountancy..)'>
                Professional services (consultancy, law practice, accountancy..)
              </option>
              <option value='Retail'>
                Retail
              </option>
              <option value='Tech provider'>
                Tech provider
              </option>
              <option value='Transport'>
                Transport
              </option>
              <option value='Retired'>
                Retired
              </option>
              <option value='Other'>
                Other
              </option>
            </select>
          </div>
        </label>
        <ValidationError field='industry' prefix='Industry' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: specifyProfileHidden })}>
        <label htmlFor={`specifyProfile${formId}`}>
          <span className={styles.label}>Specify Profile:</span>
          <input placeholder='Specify Profile' id={`specifyProfile${formId}`} type='text' name='specifyProfile' disabled={specifyProfileHidden} />
        </label>
        <ValidationError field='specifyProfile' prefix='Specify Profile' errors={state.errors} className={styles.error} />
      </div>
      <div className={cx(styles.formSection, styles.formSection__colWide, styles.formSection__topMarginLg)}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>
            Consent*
          </legend>
          <label htmlFor={`consent${formId}`} className={styles.checkboxLabel}>
            <input id={`consent${formId}`} type='checkbox' name='_optin' aria-required='true' required className={styles.checkbox} />
            <div>
              <p className={styles.consentText}>Yes, I agree to receive email communications from Flare.*</p>
              <p className={styles.consentNotice}>We will never share your email address with anyone else.</p>
            </div>
          </label>
        </fieldset>
        <ValidationError field='_optin' prefix='Consent' errors={state.errors} className={styles.error} />
      </div>
    </>
  )
}
