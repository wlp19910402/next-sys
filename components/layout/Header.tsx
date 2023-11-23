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
      <div className="flex items-center">
        <Image
          src={userInfo.headUrl}
          alt="Avatar"
          className="mb-2 mr-4"
          width={48}
        />
        <div className="ml-4">{userInfo.name}</div>
      </div>
    </header>
  )
}
