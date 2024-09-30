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

    const handleClick = () => {
      if (emailInput) {
        // emailInput.value = ''
        document.addEventListener('click', () => {
          emailInput.value = ''
          setErrorMessage(null)
          setSuccessMessage(null)
        }, { once: true })
      }
    }

    const emailValue = emailInput ? emailInput.value.trim() : ''
  
    if (emailInput?.validity.valueMissing) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
      handleClick()
    } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
      console.error('please enter a valid email address')
      setErrorMessage('please input a valid email to subscribe')
      handleClick()
    } else {
      console.info(emailValue, 'passes basic email format check')
      setErrorMessage(null)
      setSuccessMessage('signup complete')
      submitToSurveyMonkey(emailValue)
      console.log(emailValue, 'submitted')
      handleClick()
    }
  }

  return { handleSubmit, successMessage, errorMessage }
}
