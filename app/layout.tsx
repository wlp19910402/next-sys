'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useState, createContext, Context } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from '@/store'

export const FspThemeContext: Context<{}> = createContext({})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [common, setCommon] = useState({
    common: '2222',
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <FspThemeContext.Provider value={{ common }}>
            {children}
            <ToastContainer />
          </FspThemeContext.Provider>
        </Provider>
      </body>
    </html>
  )
}
