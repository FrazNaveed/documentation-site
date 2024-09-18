import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  '*.{js,jsx,ts,tsx}, !**/scripts/*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '**/*.{css,sass,scss}': "npm run lint:styles",
}
