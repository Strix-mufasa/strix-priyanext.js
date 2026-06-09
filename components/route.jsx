"use client"
import React from 'react'
import Link from 'next/link'
import '@/app/style/home.css'

const Url = () => {
  return (
    <div className='url-con'>
      <Link href='/mvp'>MVP</Link>
      <Link href='/service'>Services</Link>
      <Link href="/about">About</Link>
      <Link href="/project">Project</Link>
      <Link href="/caseStudy">CaseStudy</Link>
      <Link href="/uiux">Uiux</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/blogd">Blog Details</Link>
    </div>
  )
}

export default Url
















