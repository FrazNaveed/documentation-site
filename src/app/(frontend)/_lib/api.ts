export default async function submitToMailChimp(emailValue: string) {
  try {
    const response = await fetch('/api/subscribeUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailValue }),
    })

    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error || 'An unknown error occurred')
    }

    const { message } = await response.json()
    return message
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to subscribe')
  }
}
