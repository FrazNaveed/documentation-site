'use client'
import cx from 'classnames'
import Image from 'next/image'
import Button from '../Button'
import CheckCircle from '../svgs/CheckCircle'
import useSubscriptionForm from '../../_hooks/useSubscriptionForm'
import { useState } from 'react'
import isValidEmailFormat from '../../_utils/isValidEmailFormat'
import styles from './SubscriptionBannerCTA.module.scss'

export type CTAProps = {
  header: string
  text: string
  placeholder: string | ''
  buttonText: string
  className?: string
}

export default function SubscriptionBannerCTA({ header, text, placeholder, buttonText, className }: CTAProps) {
  const [prevEmail, setPrevEmail] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const { handleSubmit, successMessage, errorMessage } = useSubscriptionForm()
  const url ='/fw5_join_bg.png'
  const alt = 'background image'
  const imageWidth = 1728 / 2
  const imageHeight = 858 / 2

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e:any) => {
    const emailInput = e.target.value
    console.log(emailInput)
    if (emailInput !== prevEmail && !isValidEmailFormat(emailInput)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

    setPrevEmail(emailInput)
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
          <form className={cx(styles.subscriptionBanner_Form, { [styles.subscriptionBanner_Form__focus]: isFocused } )} noValidate onSubmit={(e) => handleSubmit(e)} aria-label="Newsletter Subscription">
            <label htmlFor='email' className='visuallyHidden'>Email Address</label>
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
              // aria-invalid={disabled}
              // aria-describedby={errorMessage ? 'errorMessage' : undefined}
            />
            <Button
              text={buttonText}
              size='medium'
              buttonStyle='black' // disabled state is 'secondary' but active state is 'black'
              className={cx(styles.button, { [styles.hide]: successMessage })}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {successMessage &&
              <span className={styles.subscriptionBanner_SuccessMessageWrap}>
                <p className={cx(styles.subscriptionBanner_SuccessMessage)} id='successMessage'>{successMessage}</p>
                <CheckCircle className={styles.checkCircle}/>
              </span>
            }
          </form>
          {errorMessage &&
            <p className={styles.subscriptionBanner_ErrorMessage} id='errorMessage'>
              {errorMessage}
            </p>
          }
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
      {/* {successMessage && <p>successMessage is true</p>}
      {!successMessage && <p>successMessage is false</p>} */}
      {/* {disabled && <p>disabled is true</p>}
      {!disabled && <p>disable is false</p>} */}
    </section>
  )
}