import getNewsData from '../../_lib/payload/newsQueries'
import React from 'react'
import Link from 'next/link'

const types = ['All News', 'Flare Updates', 'AMA & Interviews', 'Past Events', 'Ecosystem', 'Research']
// const news = await getNewsData()

export default function Links() {
  return (
    <div>
      <nav>
        {types.map((type, index) => (
          <li key={index}>
            <Link
              href='/news/#' //{`/news/type/${type}`}
              // onClick={() => setActiveLink(type)}
              // className active if this index link is clicked
              // className={`${activeLink === type ? 'active' : ''}`}
            >
              {`Type ${type} Link ${index}`}
            </Link>
          </li>
        ))}
      </nav>
      {/* <div>
        {
          news.slice(0,3).map((news, index) => (
            <div>
              <p key={index}>{news.title}</p>
            </div>
          ))
        }
      </div> */}
    </div>
  );
}