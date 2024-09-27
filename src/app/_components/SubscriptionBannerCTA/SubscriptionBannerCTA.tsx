'use client'
import cx from 'classnames'
import { FormEvent } from 'react'
import Image from 'next/image'
import Button from '../Button'
import isValidEmailFormat from '../../../../scripts/validateEmailFormat'
import styles from './SubscriptionBannerCTA.module.scss'

export type CTAProps = {
  header: string
  text: string
  placeholder: string | ''
  buttonText: string
  className?: string
}

function handleSubmit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault()

  const form = e.currentTarget
  const emailInput = form.elements.namedItem('email') as HTMLInputElement | null
  // console.log("Email input:", emailInput)

  if (!emailInput) {
    console.error('email is required')
    // add state change to set showError to true
    return
  }

  const emailValue = emailInput.value.trim()

  if (emailInput?.validity.valueMissing) {
    console.error('email is required')
  } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
    console.error('please enter a valid email address')
  } else {
    console.info(emailValue, 'passes basic email format check')
    submitToSurveyMonkey(emailValue)
    console.log(emailValue, 'submitted')
  }
}

function submitToSurveyMonkey(email: string): void {
  // This function would typically make a POST request to SurveyMonkey API with the email address
  // For now, we just log it to the console
  console.log('Submitting', email, 'to SurveyMonkey')
}

export default function SubscriptionBannerCTA({ header, text, placeholder, buttonText, className }: CTAProps) {
  const url ='/fw5_join_bg.png'
  const alt = 'background image'
  let imageWidth = 1728 / 2
  let imageHeight = 858 / 2
  // testing
  let isError = true

  return (
    <section className={cx(styles.subscriptionBanner, className)}>
      <div className={styles.container}>
        <div className={styles.formWrap}>
          <h2 className={styles.header}>{header}</h2>
          <p className={styles.text}>{text}</p>
          <form className={styles.subscriptionBanner_Form} noValidate onSubmit={(e) => handleSubmit(e)}>
            <input
              type='email'
              name='email'
              placeholder={placeholder}
              required
              className={styles.subscriptionBanner_FormInput}
            />
            <Button
              text={buttonText}
              size='medium'
              buttonStyle='black' // disabled state is 'secondary' but active state is 'black'
              className={styles.button}
              disabled={isError ? true : false}
            />
          </form>
          <p className={styles.subscriptionBanner_ErrorMessage} id='errorMessage'>please input a valid email to subscribe</p>
        </div>
        <div className={styles.imageWrap}>
          <Image
            className={styles.img}
            src={url}
            width={imageWidth}
            height={imageHeight}
            alt={alt}
          />
        </div>
      </div>
    </section>
  )
}