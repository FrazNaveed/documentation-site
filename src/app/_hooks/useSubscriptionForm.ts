import { useState, useEffect, FormEvent } from 'react'
import isValidEmailFormat from '../_utils/isValidEmailFormat'
import { submitToMailChimp } from '../_lib/api'

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

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null
    // console.log("Email input:", emailInput)
    const emailValue = emailInput ? emailInput.value.trim() : ''
    console.log('email value: ', emailValue)

    // original handleClick
    // const handleClick = () => {
    //   if (emailInput) {
    //     // emailInput.value = ''
    //     document.addEventListener('click', () => {
    //       emailInput.value = ''
    //       setErrorMessage(null)
    //       setSuccessMessage(null)
    //     }, { once: true })
    //   }
    // }

    // separate actions per function
    // const clearInput = () => {
    //   if (emailInput) {
    //     console.log('email value in clearInput', emailInput.value)
    //     emailInput.value = ''
    //   }
    // }

    // const handleClearAll = () => {
    //   clearInput()
    //   clearMessages()
    // }

    // const handleClick = () => {
    //   if (emailInput) {
    //     setupClearListeners()
    //   }
    // }
    // test adding multiple listeners

    if (emailInput?.validity.valueMissing) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
    } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
      console.error('please enter a valid email address')
      setErrorMessage('please input a valid email to subscribe')
    } else {
      console.info(emailValue, 'passes basic email format check')
      setSuccessMessage('signup complete')
      submitToMailChimp(emailValue)
      console.log(emailValue, 'submitted')
    }

    if (emailInput) {
      emailInput.value = ''
    }
  }

  return { handleSubmit, successMessage, errorMessage }
}
