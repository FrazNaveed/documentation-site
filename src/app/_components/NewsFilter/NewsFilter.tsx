import getNewsData from '../../_lib/payload/newsQueries'
import React, { JSX } from 'react'
import Link from 'next/link'

const types = ['All News', 'Flare Updates', 'AMA & Interviews', 'Past Events', 'Ecosystem', 'Research']

export default function Links(): JSX.Element {
  return (
    <div>
      <nav>
        {types.map((type, index) => (
          <li key={index}>
            <Link href={`/news/type/${type}`}>{`Type ${type} Link`}</Link>
          </li>
        ))}
      </nav>
    </div>
  )
}