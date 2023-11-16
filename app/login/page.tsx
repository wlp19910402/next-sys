'use client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { FspThemeContext } from '@/app/layout'
import { getWxLoginCode } from '@/clientApi/system/user'
// const fspData = useContext<any>(FspThemeContext)

export default function Page() {
  const fspData = useContext<any>(FspThemeContext)
  const [qrCodeInfo, setQrCodeInfo] = useState({
    ticket: '',
    expireSeconds: 0,
    createTime: '',
    loginToken: '',
  })

  const [countDown, setCountDown] = useState(0)
  const [reRefreshCode, setReRefreshCode] = useState(true)

  useEffect(() => {
    let timer: any = null
    if (countDown > 0) {
      timer = setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000)
    } else {
      setReRefreshCode(true)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [countDown])
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getWxLoginCode({ channelId: fspData.user.channelId })
        if (res.code === 200) {
          setReRefreshCode(false)
          setQrCodeInfo({
            expireSeconds: res.data.expireSeconds,
            createTime: res.data.createTime,
            loginToken: res.data.loginToken,
            ticket: `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${res.data.ticket}`,
          })

          setCountDown(res.data.expireSeconds)
          //
        } else {
          console.log(res.msg)
        }
      } catch (err) {
        console.log(err)
        // koiMsgError('获取登录二维码失败')
        setCountDown(0)
        console.log('获取登录二维码失败')
      }
    }
    if (fspData.user.channelId && reRefreshCode) {
      fetchData().catch(console.error)
    }
  })

  return (
    <>
      <div className="flex items-center flex-col max-h-screen min-h-screen justify-center bg-gradient-to-tl from-violet-500 to-fuchsia-500">
        <div className="h-auto bg-white py-6 px-10 rounded-xl xs:w-full  sm:w-3/6 md:w-2/5 lg:w-1/3 xl:w-1/4 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              width={80}
              height={80}
              src="/logo.jpeg"
              className="mx-auto rounded-2xl"
              alt="云信"
            />
            <h2 className="text-center text-md leading-9 tracking-tight text-gray-500">
              欢迎登录云信系统
            </h2>
          </div>

          <div className="mt-4 border h-64 w-64 mx-auto text-gray-500 rounded-md overflow-hidden">
            {qrCodeInfo.ticket ? (
              <img src={qrCodeInfo.ticket} alt="云信" layout="cover" />
            ) : (
              <span>正在加载...</span>
            )}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            倒计时:{countDown}
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            使用微信扫一扫?
            <a
              onClick={() => setReRefreshCode(true)}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              刷新二维码
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
