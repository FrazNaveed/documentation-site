import getNewsData from '../../_lib/payload/newsQueries'
import React from 'react'
import Link from 'next/link'

// const news = await getNewsData()

export default function Links({ navLinks }: { navLinks: string[] }) {
  return (
    <div>
      <nav>
        {navLinks && navLinks.map((type: string, index: number) => (
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