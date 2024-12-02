'use client'

import cx from 'classnames'
import Image from 'next/image'
import Button from 'src/app/(frontend)/_components/Button'
import CheckCircle from 'src/app/(frontend)/_components/svgs/CheckCircle'
import useSubscriptionForm from 'src/app/(frontend)/_hooks/useSubscriptionForm'
import { useState } from 'react'
import isValidEmailFormat from 'src/app/(frontend)/_utils/isValidEmailFormat'
import { i18n } from '@/src/app/i18n-config'
import styles from './SubscriptionBannerCTA.module.scss'

export type CTAProps = {
  header?: string
  text?: string
  placeholder?: string | ''
  buttonText?: string
  className?: string
}

export default function SubscriptionBannerCTA({
  header = 'Subscribe to the Flare Newsletter',
  text = 'Join over 20,000 fellow blockchain enthusiasts. Sign up to our newsletter today to receive our exclusive web3 insights and be informed of our latest product releases.',
  placeholder = 'Type your email here|',
  buttonText = 'Subscribe',
  className,
}: CTAProps) {
  const [disabled, setDisabled] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const { handleSubmit, successMessage, errorMessage } = useSubscriptionForm()
  const url = `/${i18n.defaultLocale}/fw5_join_bg.png`
  const alt = 'background image'
  const imageWidth = 1728 / 2
  const imageHeight = 858 / 2

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value
    // console.log(emailInput)
    setDisabled(!isValidEmailFormat(emailInput))
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <section className={cx(styles.subscriptionBanner, className)}>
      <div className={styles.container}>
        <div className={styles.formWrap}>
          <h2 className={styles.header}>{header}</h2>
          <p className={styles.text}>{text}</p>
          <form className={cx(styles.subscriptionBanner_Form, { [styles.subscriptionBanner_Form__focus]: isFocused })} noValidate onSubmit={(e) => handleSubmit(e)} aria-label='Newsletter Subscription'>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label
              htmlFor='email'
              className='visuallyHidden'
            >
              Email Address
            </label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder={placeholder}
              required
              className={styles.subscriptionBanner_FormInput}
              onChange={(e) => handleChange(e)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              // eslint-disable-next-line no-nested-ternary
              aria-describedby={errorMessage ? 'errorMessage' : successMessage ? 'successMessage' : undefined}
            />
            <Button
              text={buttonText}
              size='medium'
              buttonStyle='black' // disabled state is 'secondary' but active state is 'black'
              className={cx(styles.button, { [styles.hide]: successMessage })}
              disabled={disabled}
              aria-invalid={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {successMessage
              && (
              <span className={styles.subscriptionBanner_SuccessMessageWrap}>
                <p className={cx(styles.subscriptionBanner_SuccessMessage)} id='successMessage' aria-live='polite'>{successMessage}</p>
                <CheckCircle className={styles.checkCircle} />
              </span>
              )}
          </form>
          {errorMessage
            && (
            <p className={styles.subscriptionBanner_ErrorMessage} id='errorMessage' aria-live='assertive'>
              {errorMessage}
            </p>
            )}
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
