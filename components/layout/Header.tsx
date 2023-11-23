'use client'

import { Dispatch, SetStateAction, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Image } from 'antd'
import { useAppSelector } from '@/store/hooks'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { GlobalContext } from '@/app/layout'

export default function Cmp(props: {
  menuUnfold: boolean
  setMenuUnfold: Dispatch<SetStateAction<boolean>>
}) {
  const userInfo = useAppSelector((state) => state.user)
  const globalContext = useContext<any>(GlobalContext)
  return (
    <header className="header w-full shadow-sm  flex h-14 bg-white border-b border-gray-100 items-center justify-between px-4">
      {!globalContext.isMobile ? (
        <div
          className="cursor-pointer"
          onClick={() => props.setMenuUnfold(!props.menuUnfold)}
        >
          {props.menuUnfold ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex items-center justify-center">
        <Image
          src={userInfo.headUrl}
          alt="Avatar"
          className="mr-4 rounded-full"
          width={36}
          fallback="/avatar.jpeg"
        />
        <div className="ml-4 text-gray-400 text-sm">
          {userInfo.name ? userInfo.name : '未知姓名'}
        </div>
      </div>
    </header>
  )
}
