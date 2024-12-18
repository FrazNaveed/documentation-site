'use client'

import { ValidationError, useForm } from '@formspree/react'
import cx from 'classnames'
import Button from 'src/app/(frontend)/_components/Button'
import type { IContactFormBlock, INewsletterSignupFormBlock } from '@/payload-types'
import ContactForm from './ContactForm'
import NewsletterSignupForm from './NewsletterSignupForm'
import styles from './FormBlock.module.scss'

type TFormsBlock = {
  className?: string
}

type TContactForm = IContactFormBlock & TFormsBlock

type TNewsletterSignupForm = INewsletterSignupFormBlock & TFormsBlock

export type FormBlockProps = TContactForm | TNewsletterSignupForm

export default function FormBlock({ title, blockType, className }: FormBlockProps) {
  const formsInfo = {
    contactForm: {
      id: 'mbljlzqo',
      formComponent: ContactForm,
    },
    newsletterSignupForm: {
      id: 'xeqvarae',
      formComponent: NewsletterSignupForm,
    },
  }
  const formId = formsInfo[blockType].id
  const FormComponent = formsInfo[blockType].formComponent
  const [state, handleSubmit, reset] = useForm(formId)
  return (
    <section className={className}>
      <div className={styles.grid}>
        {title && <h2 className={styles.formBlockTitle}>{title}</h2>}
      </div>
      <div className={styles.formWrap}>
        {state.succeeded ? (
          <div className={styles.grid}>
            <div className={styles.successMessage}>
              <p>Thanks! Form submitted.</p>
              <Button type='button' onClick={reset} text='Reset form' buttonStyle='black' />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={cx(styles.grid, styles.form)}>
            <FormComponent formId={formId} state={state} />
            <div className={cx(styles.submitWrap)}>
              <Button type='submit' disabled={state.submitting} text={state.submitting ? 'Sending...' : 'Send'} />
              <ValidationError errors={state.errors} className={styles.error} />
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
