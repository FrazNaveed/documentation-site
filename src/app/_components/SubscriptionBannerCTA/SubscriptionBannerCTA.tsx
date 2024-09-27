'use client'
import cx from 'classnames'
import Image from 'next/image'
import Button from '../Button'
import CheckCircle from '../svgs/CheckCircle'
import useSubscriptionForm from '../../_hooks/useSubscriptionForm'
import styles from './SubscriptionBannerCTA.module.scss'

export type CTAProps = {
  header: string
  text: string
  placeholder: string | ''
  buttonText: string
  className?: string
}

export default function SubscriptionBannerCTA({ header, text, placeholder, buttonText, className }: CTAProps) {
  const url ='/fw5_join_bg.png'
  const alt = 'background image'
  let imageWidth = 1728 / 2
  let imageHeight = 858 / 2

  const { handleSubmit, successMessage, errorMessage } = useSubscriptionForm()
  let disabled = false

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
              className={cx(styles.button, { [styles.hide]: successMessage })}
              disabled={disabled}
            />
            {successMessage &&
              <span className={styles.subscriptionBanner_SuccessMessageWrap}>
                <p className={cx(styles.subscriptionBanner_SuccessMessage)}>{successMessage}</p>
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
    </section>
  )
}