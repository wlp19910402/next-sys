'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { fetchWebSocket } from '@/utils/websocket'
import { useEffect, useState, createContext, Context } from 'react'
import { fetchWxLogin } from '@/clientApi/system/user'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export const FspThemeContext: Context<{}> = createContext({})

interface WsResponseParams {
  type: string
  data: any
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  toast.success('恭喜，登录成功🐰')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState({
    authToken: '',
    name: '',
    phone: '',
    headUrl: '',
    roleCode: '',
    id: '',
    channelId: '',
    loginToken: '',
  })
  async function webSocketMessage(
    data: WsResponseParams,
    callback?: (params: true) => void
  ) {
    switch (data.type) {
      case 'TokenMsg':
        setUser({ ...user, channelId: data.data.channelId })
        break
      case 'LoginMsg':
        let token = data.data.loginToken
        setUser({ ...user, loginToken: token })

        fetchWxLogin({
          code: token,
          type: 'pcLogin',
        })
          .then((res: any) => {
            if (res.code === 200) {
              localStorage.setItem('authToken', res.data.token)
              setUser({ ...user, loginToken: token, ...res.data })
              if (callback) callback(true)
            } else {
              toast.error(res.msg)
            }
          })
          .catch(() => {
            toast.error('登录失败')
          })
        break
      default:
        break
    }
  }

  const handleMessage = (e: any) => {
    // alert('有新的消息')
    // 新消息插入  判断是否是新消息
    let message = JSON.parse(e.data)
    webSocketMessage(message, (isLogin: boolean) => {
      if (isLogin) {
        const redirectPath = searchParams.get('redirect') as
          | string
          | undefined
          | null

        toast.success('恭喜，登录成功🐰')

        // router.push(redirectPath || '/')
      }
    })
    // userStore.webSocketMessage(message, (isLogin) => {
    //   if (isLogin) {
    //     const redirectPath = route.query.redirect as string | undefined
    //     koiNoticeSuccess('恭喜，登录成功🐰')
    //     router.push(redirectPath || '/home')
    //   }
    // })
  }

  useEffect(() => {
    fetchWebSocket(handleMessage)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <FspThemeContext.Provider value={{ user }}>
          {children}
        </FspThemeContext.Provider>
      </body>
    </html>
  )
}

// export function FspTheme() {
//   return useContext(FspThemeContext)
// }
