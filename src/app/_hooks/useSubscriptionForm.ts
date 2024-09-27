import { useState, FormEvent } from 'react'
import isValidEmailFormat from '../_utils/isValidEmailFormat'
import { submitToSurveyMonkey } from '../_lib/api'

export default function useSubscriptionForm() {
  const [errorMessage, setErrorMessage ] = useState<string | null>(null)

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null
    // console.log("Email input:", emailInput)
  
    if (!emailInput) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
      return
    }
  
    const emailValue = emailInput.value.trim()
  
    if (emailInput?.validity.valueMissing) {
      console.error('email is required')
      setErrorMessage('please input a valid email to subscribe')
    } else if (emailInput?.validity.typeMismatch || !isValidEmailFormat(emailValue)) {
      console.error('please enter a valid email address')
      setErrorMessage('please input a valid email to subscribe')
    } else {
      console.info(emailValue, 'passes basic email format check')
      setErrorMessage(null)
      submitToSurveyMonkey(emailValue)
      console.log(emailValue, 'submitted')
    }
  }

  return { handleSubmit, errorMessage }
}
