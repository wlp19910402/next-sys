'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useState, createContext, Context, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import InitLayoutCmp from '@/components/layout/InitCmp'
import store from '@/store'

export const GlobalContext: Context<{}> = createContext({})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [common, setCommon] = useState({
    common: '2222',
  })
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <GlobalContext.Provider value={{ common, isMobile }}>
            <InitLayoutCmp />
            {children}
            <ToastContainer />
          </GlobalContext.Provider>
        </Provider>
      </body>
    </html>
  )
}
