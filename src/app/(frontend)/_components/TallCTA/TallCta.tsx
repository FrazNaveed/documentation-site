// import Image from 'next/image'
import Button from '../Button'
// import DiagonalArrowSquare from '../svgs/DiagonalArrowSquare'
import styles from './TallCta.module.scss'

export default function TallCta({
  title, content, buttonText, buttonLink,
}: any) {
  return (
    <section className={styles.tallCta}>
      <div className={styles.tallCtaWrap}>
        <div>
          image
        </div>
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          <Button
            text={buttonText}
            link={buttonLink}
          />
        </div>
      </div>
    </section>
  )
}
