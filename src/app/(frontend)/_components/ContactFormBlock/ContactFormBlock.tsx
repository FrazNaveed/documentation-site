'use client'

import { ValidationError, useForm } from '@formspree/react'
import cx from 'classnames'
import Button from 'src/app/(frontend)/_components/Button'
import type { IContactFormBlock } from '@/payload-types'
import styles from './ContactFormBlock.module.scss'

export type ContactFormBlockProps = IContactFormBlock & {
  className?: string
}

export default function ContactFormBlock({ title, className }: ContactFormBlockProps) {
  const formId = 'mbljlzqo'
  const [state, handleSubmit, reset] = useForm(formId)
  return (
    <section className={cx(styles.grid, className)}>
      {title && <h2 className={styles.formBlockTitle}>{title}</h2>}
      <div className={styles.formWrap}>
        {state.succeeded ? (
          <>
            <p>Thanks! Form submitted.</p>
            <Button type='button' onClick={reset} text='Reset form' buttonStyle='black' />
          </>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={cx(styles.formSection, styles.formSection__partial)}>
              <label htmlFor={`email${formId}`}>
                <span className={styles.label}>Your email*:</span>
                <input placeholder='Your email*' id={`email${formId}`} type='email' name='email' aria-required='true' />
              </label>
              <ValidationError field='email' prefix='Email' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__full)}>
              <label htmlFor={`message${formId}`}>
                <span className={styles.label}>Your message:</span>
                <textarea placeholder='Your message' id={`message${formId}`} name='message' rows={6} />
              </label>
              <ValidationError field='message' prefix='Message' errors={state.errors} className={styles.error} />
            </div>
            <div>
              <Button type='submit' disabled={state.submitting} text={state.submitting ? 'Sending...' : 'Send'} />
              <ValidationError errors={state.errors} className={styles.error} />
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
