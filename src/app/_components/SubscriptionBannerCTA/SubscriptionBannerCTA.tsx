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
  const url = ''
  const alt = 'background image'

  return (
    <section className={cx(styles.subscriptionBanner, className)}>
      <Image
        className={styles.img}
        src={url}
        // width={imageWidth}
        // height={imageHeight}
        alt={alt}
      />
      <div className={styles.subscriptionBanner_FormWrap}>
        <h2>{header}</h2>
        <p>{text}</p>
        <form className={styles.subscriptionBanner_Form}>
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
            // onClick={(e) => {
            //   e.preventDefault(); // prevent default form submission behavior
            //   // add email subscription logic here (e.g. API call, local storage update, etc.)
            // }}
          />
        </form>
      </div>
    </section>
  )
}