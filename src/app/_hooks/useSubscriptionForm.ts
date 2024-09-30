import { useState, FormEvent } from 'react'
import isValidEmailFormat from '../_utils/isValidEmailFormat'
import { submitToSurveyMonkey } from '../_lib/api'

export default function useSubscriptionForm() {
  const [errorMessage, setErrorMessage ] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
    const clearInput = () => {
      if (emailInput) {
        console.log('email value in clearInput', emailInput.value)
        emailInput.value = ''
      }
    }

    const clearMessages = () => {
      setErrorMessage(null)
      setSuccessMessage(null)
    }

    const handleClearAll = () => {
      clearInput()
      clearMessages()
    }

    const setupClearListeners = () => {
      const clearEvents = ['click', 'keydown']

      clearEvents.forEach((eventType) => {
        if (eventType === 'keydown') {
          document.addEventListener(eventType, (event) => {
            if (event.key !== 'Enter') {
              handleClearAll()
            }
          }, { once: true })
        } else {
          document.addEventListener(eventType, handleClearAll, { once: true })
        }
      })
    }

    // const handleClick = () => {
    //   if (emailInput) {
    //     setupClearListeners()
    //   }
    // }
    // test adding multiple listeners

    if (emailInput?.validity.valueMissing) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
      setupClearListeners()
    } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
      console.error('please enter a valid email address')
      setErrorMessage('please input a valid email to subscribe')
      setupClearListeners()
    } else {
      console.info(emailValue, 'passes basic email format check')
      setSuccessMessage('signup complete')
      submitToSurveyMonkey(emailValue)
      console.log(emailValue, 'submitted')
      setupClearListeners()
    }
  }

  return { handleSubmit, successMessage, errorMessage }
}
