import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email }: { email: string } = await req.json()

    if (!email || email.length === 0) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX

    const data = {
      email_address: email,
      status: 'subscribed',
    }

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.status >= 400) {
      return NextResponse.json(
        { error: `There was an error subscribing the email: ${responseData.detail || response.statusText}` },
        { status: response.status }
      )
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    )
  }
}
