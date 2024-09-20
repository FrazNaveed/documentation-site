import getNewsData from '../../_lib/payload/newsQueries'
import React from 'react'
import Link from 'next/link'

// const news = await getNewsData()

export default function Links({ navLinks }: {navLinks: { text: string, link: string }[]}) {
  return (
    <div>
      <nav>
        {navLinks && navLinks.map((navLink, index) => (
          <li key={index}>
            <Link href={`/news/${navLink.link}`}>
              {navLink.text}
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
  )
}