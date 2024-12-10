// To create a redirect, just add the source and destination to the array, comma separated string
const redirectList = [
  '/test-old,/test',
]

const manualRedirects = redirectList.map((redirect) => {
  const [source, destination] = redirect.split(',')
  return {
    source,
    destination,
    permanent: false,
  }
})

export default manualRedirects
