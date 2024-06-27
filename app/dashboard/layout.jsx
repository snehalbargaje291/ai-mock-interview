import React from 'react'
import Header  from './_components/Header'

export default function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className=' mt-20 md:mt-24 mx-8 md:mx-14 lg:mx-20'>{children}</div>
    </div>
  )
}

