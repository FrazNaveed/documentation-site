import StatsBlock from 'src/app/(frontend)/_components/Stats'
import getStatsBlockFromPage from 'src/app/(frontend)/_lib/payload/statsQueries'
import { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'

const testStats = await getStatsBlockFromPage('test')

export default function Page() {
  return (
    <>
      <h1>Components</h1>
      <h2>Stats</h2>
      {testStats?.stats && testStats?.caption
        && (
        <StatsBlock
          stats={testStats.stats}
          caption={testStats.caption as PayloadLexicalReactRendererContent}
        />
        )}
    </>
  )
}
