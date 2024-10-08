import StatsBlock from 'src/app/(frontend)/_components/Stats'
import getStatsBlockFromPage from 'src/app/(frontend)/_lib/payload/statsQueries'
import { PayloadLexicalReactRendererContent } from 'src/app/(frontend)/_components/LexicalRenderer/LexicalRenderer'
import TalkingPoints from '../../../_components/TalkingPoints'

const testStats = await getStatsBlockFromPage('fooz')
// console.log('testStats: ', testStats)

export default function Page() {
  // const stats = [
  //   { label: 'Flaredrop Apr*', stat: '24.18%', id: '12345' },
  //   { label: 'flaredrop + delegating APR*', stat: '30.95%', id: '23456' },
  //   { label: 'Flaredrop + Staking APR*', stat: '35.99%', id: '34678' },
  // ]

  // eslint-disable-next-line max-len
  // const caption = '*APR values are variable and depend on total FLR staked, data provider performance and other factors. See Oracle Daemon to learn more'

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
      <br />
      <h2>Talking Points</h2>
      <TalkingPoints />
    </>
  )
}
