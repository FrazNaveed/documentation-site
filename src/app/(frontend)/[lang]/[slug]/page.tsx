import { getDictionary } from 'src/app/get-dictionary'
import { Locale } from 'src/app/i18n-config'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <h1>{dictionary['server-component'].hello}, Next.js!</h1>
      <h2>lang locale = {lang}</h2>
      <h3>
        This text is rendered on the server:{' '}
        {dictionary['server-component'].hello}
        {' '}
        {dictionary['server-component'].and}
        {' '}
        {dictionary['server-component'].welcome}
      </h3>
      <p>Switch between en, es, and de in the URL to see different languages. Other languages will default to en.</p>
    </div>
  )
}