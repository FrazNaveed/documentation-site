import cx from 'classnames'
import MagnifyingGlass from '../../../svgs/MagnifyingGlass'
import styles from './SearchButton.module.scss'

type SearchButtonProps = {
  className?: string
}

export default function SearchButton({ className }: SearchButtonProps) {
  return (
    <button type='button' aria-label='Toggle search' className={cx(styles.searchButton, className)}>
      <MagnifyingGlass />
    </button>
  )
}
