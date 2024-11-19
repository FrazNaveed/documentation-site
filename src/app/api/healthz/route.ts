import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const dbCheck = await payload.db.drizzle.execute('SELECT 1;')
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error({error})
    return NextResponse.json({ message: 'NOT READY' }, { status: 500 })
  }
}
