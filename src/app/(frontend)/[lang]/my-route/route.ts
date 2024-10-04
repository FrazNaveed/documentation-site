import configPromise from '@payload-config'
import { getPayload } from 'payload'

// eslint-disable-next-line import/prefer-default-export
export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  return Response.json(data)
}
