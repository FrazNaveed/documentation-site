'use client'

import { useState, useEffect } from 'react'
import Button from 'src/app/(frontend)/_components/Button'
import styles from '../CodeCTABlock.module.scss'

type CodeCTACopyButtonProps = {
  codeToCopy: string
}

export default function CodeCTACopyButton({ codeToCopy }: CodeCTACopyButtonProps) {
  const [buttonText, setButtonText] = useState('Copy')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const copyCodeClick = () => {
    navigator.clipboard.writeText(codeToCopy)
    setButtonText('Copied')
    const timeout = setTimeout(() => setButtonText('Copy'), 3000)
    setTimeoutId(timeout)
  }
  return (
    <Button className={styles.copyButton} type='button' onClick={copyCodeClick} text={buttonText} buttonStyle='secondary' size='small' />
  )
}
