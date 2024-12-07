import React from 'react'
import Nav from './nav'
import Footer from './footer'

function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Nav />

    {children}

    <Footer />
    </>
  )
}

export default Page