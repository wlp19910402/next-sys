'use client'

import { fetchWebSocket } from '@/utils/websocket'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { webSocketMessage, wxLoginThunk } from '@/store/slice/user'

interface WsResponseParams {
  type: string
  data: any
}

export default function InitCmp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const authToken = useAppSelector((state) => state.user.authToken)
  const isLogin = useAppSelector((state) => state.user.id)

  // wx监听是否有扫码返回token数据返回,使用token进行登录
  useEffect(() => {
    if (authToken) dispatch(wxLoginThunk({ code: authToken, type: 'pcLogin' }))
  }, [authToken])

  // wx监听是否有扫码登录成功的信息返回 ，登录成功则进行跳转页面
  useEffect(() => {
    console.log('222222===')
    if (isLogin) {
      const redirectPath = searchParams.get('redirect') as
        | string
        | undefined
        | null

      toast.success('恭喜，登录成功🐰')

      router.push(redirectPath || '/sys/home')
    }
  }, [isLogin])

  // 分析 ws的数据
  const handleMessage = (e: WsResponseParams) => {
    // alert('有新的消息')
    // 新消息插入  判断是否是新消息
    let message = JSON.parse(e.data)
    dispatch(
      webSocketMessage({
        ...message,
      })
    )
  }

  useEffect(() => {
    fetchWebSocket(handleMessage)
  }, [])

  return <></>
}
