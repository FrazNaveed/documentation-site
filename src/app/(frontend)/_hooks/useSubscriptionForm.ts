import { useState, useEffect, FormEvent } from 'react'
import isValidEmailFormat from 'src/app/(frontend)/_utils/isValidEmailFormat'
import { submitToMailChimp } from 'src/app/(frontend)/_lib/api'

export default function useSubscriptionForm() {
  const [errorMessage, setErrorMessage ] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const clearMessages = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent | MouseEvent) => {
      if ('key' in event && event.type === 'keydown' && event.key === 'Enter') return
      clearMessages()
    }

    document.addEventListener('click', handleEvent)
    document.addEventListener('keydown', handleEvent)

    return () => {
      document.removeEventListener('click', handleEvent)
      document.removeEventListener('keydown', handleEvent)
    }
  }, [])

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null
    // console.log("Email input:", emailInput)
    const emailValue = emailInput ? emailInput.value.trim() : ''
    // console.log('email value: ', emailValue)

    if (emailInput?.validity.valueMissing) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
    } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
      console.error('please enter a valid email address')
      setErrorMessage('please input a valid email to subscribe')
    } else {
      console.info(emailValue, 'passes basic email format check, enabling submit button')
      try {
        const message = await submitToMailChimp(emailValue)
        setSuccessMessage('signup complete')
        setErrorMessage(null)
        console.log(emailValue, 'submitted')
      } catch (error) {
        // console.error(error instanceof Error ? error.message : 'Failed to subscribe')
        setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe')
      }
    }

    if (emailInput) {
      emailInput.value = ''
    }
  }

  return { handleSubmit, successMessage, errorMessage }
}
