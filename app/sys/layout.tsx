'use client'

import { useState } from 'react'
import MenuCmp from '@/components/layout/Menu'
import HeaderCmp from '@/components/layout/Header'
import FooterCmp from '@/components/layout/Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuUnfold, setMenuUnfold] = useState(true)
  return (
    <div className="flex w-screen h-screen box-border">
      <MenuCmp menuUnfold={menuUnfold} />
      <div className="flex-col flex flex-1 ">
        <HeaderCmp menuUnfold={menuUnfold} setMenuUnfold={setMenuUnfold} />
        <main className="main flex-1 bg-gray-50  flex flex-col overflow-auto ">
          <div className="p-1">
            <div className="h-10 bg-red-500">/sss</div>
            {children}
          </div>
        </main>
        <FooterCmp />
      </div>
    </div>
  )
}
