'use client'

import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
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
          <div className="p-3">
            <div className="h-10 bg-red-500">/sss</div>
            <div className="overflow-auto flex-1">
              {children}
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return <div className="mb-20 bg-cyan-200 h-96" key={item}></div>
              })}
            </div>
          </div>
        </main>
        <FooterCmp />
      </div>
    </div>
  )
}
