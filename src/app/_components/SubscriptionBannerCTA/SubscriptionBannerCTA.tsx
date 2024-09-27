import cx from 'classnames'
import Image from 'next/image'
import Button from '../Button'
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

  return (
    <section className={cx(styles.subscriptionBanner, className)}>
      <div className={styles.container}>
        <div className={styles.formWrap}>
          <h2 className={styles.header}>{header}</h2>
          <p className={styles.text}>{text}</p>
          <form className={styles.subscriptionBanner_Form} noValidate>
            <input
              type="email"
              placeholder={placeholder}
              required
              className={styles.subscriptionBanner_FormInput}
            />
            <Button
              text={buttonText}
              size='medium'
              buttonStyle='black'
              className={styles.button}
              // onClick={(e) => {
              //   e.preventDefault(); // prevent default form submission behavior
              //   // add email subscription logic here (e.g. API call, local storage update, etc.)
              // }}
            />
          </form>
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