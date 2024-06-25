import React from 'react'
import Header  from './_components/Header'

export default function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <main>{children}</main>
    </div>
  )
}

