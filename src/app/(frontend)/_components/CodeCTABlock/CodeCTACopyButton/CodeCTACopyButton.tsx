'use client'

import { useState, useEffect } from 'react'
import Button from 'src/app/(frontend)/_components/Button'
import styles from '../CodeCTABlock.module.scss'

type CodeCTACopyButtonProps = {
  codeToCopy: string
}

export default function CodeCTACopyButton({ codeToCopy }: CodeCTACopyButtonProps) {
  const defaultText = 'copy'
  const timeoutDuration = 3000
  const [buttonText, setButtonText] = useState(defaultText)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const copyCodeClick = () => {
    try {
      navigator.clipboard.writeText(codeToCopy)
      setButtonText('copied')
      const timeout = setTimeout(() => setButtonText(defaultText), timeoutDuration)
      setTimeoutId(timeout)
    } catch (error) {
      console.error('Failed to copy:', error)
      setButtonText('failed')
      const timeout = setTimeout(() => setButtonText(defaultText), timeoutDuration)
      setTimeoutId(timeout)
    }
  }
  return (
    <Button className={styles.copyButton} type='button' onClick={copyCodeClick} text={buttonText} buttonStyle='secondary' size='small' />
  )
}
