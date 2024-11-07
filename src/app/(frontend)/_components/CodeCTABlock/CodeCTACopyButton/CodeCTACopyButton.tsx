'use client'

import { useState } from 'react'
import Button from 'src/app/(frontend)/_components/Button'
import styles from '../CodeCTABlock.module.scss'

type CodeCTACopyButtonProps = {
  codeToCopy: string
}

export default function CodeCTACopyButton({ codeToCopy }: CodeCTACopyButtonProps) {
  const [buttonText, setButtonText] = useState('Copy')
  const copyCodeClick = () => {
    navigator.clipboard.writeText(codeToCopy)
    setButtonText('Copied')
    setTimeout(() => setButtonText('Copy'), 3000)
  }
  return (
    <Button className={styles.copyButton} type='button' onClick={copyCodeClick} text={buttonText} buttonStyle='secondary' size='small' />
  )
}
