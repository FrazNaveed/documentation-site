export const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
export const baseUrl = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000'
