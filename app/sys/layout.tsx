'use client'

import { useState, createContext, Context } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, Image, Divider, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useAppSelector } from '@/store/hooks'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

const { Text, Link } = Typography
type MenuItem = Required<MenuProps>['items'][number]
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userInfo = useAppSelector((state) => state.user)
  const items: MenuProps['items'] = [
    getItem('首页', 'home', <MailOutlined />),
    getItem('系统管理', 'sys', <AppstoreOutlined />, [
      getItem('用户管理', '/sys/user', <MailOutlined />),
      getItem('角色管理', '/sys/role'),
      getItem('菜单管理', '/sys/menu'),
      getItem('字典管理', '/sys/dic'),
    ]),
    getItem('单位管理', '/sys/company', <MailOutlined />),
    getItem('设备管理', '/sys/machine', <MailOutlined />),
    getItem('全域联系法官一体机', '/sys/contact', <MailOutlined />),
    getItem('配件管理', '/sys/mountings', <MailOutlined />),
    getItem('配件需求管理', '/sys/purchase', <MailOutlined />),
    getItem('工单管理', '/sys/order', <SettingOutlined />, [
      getItem('创建工单', '/sys/order/create'),
      getItem('执行中工单', '/sys/order/processing'),
      getItem('待处理工单', '/sys/order/waiting'),
      getItem('已处理工单', '/sys/order/passing'),
      getItem('已完成工单', '/sys/order/complete'),
    ]),
    getItem('工单查询', 'all', <MailOutlined />),
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }
  const [menuUnfold, setMenuUnfold] = useState(true)
  return (
    <div className="flex w-screen h-screen box-border">
      <aside
        className={`h-full bg-white overflow-auto flex flex-col border-slate-100 border-r-2 border-solid ${
          menuUnfold ? 'w-64' : 'w-18'
        }`}
      >
        <Link className="flex items-center h-14 pl-4  " href="/sys/home">
          <Image src="/logo.png" className="mb-2" width={48} />
          {menuUnfold ? (
            <span className="mx-3 text-base text-gray-600">
              云信信息管理系统
            </span>
          ) : (
            <></>
          )}
        </Link>
        <div className="flex-1 overflow-auto">
          <Menu
            onClick={onClick}
            inlineCollapsed={!menuUnfold}
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['/sys/order/processing']}
            mode="inline"
            className="border-none shadow-none qm-border-inline-none"
            items={items}
          />
        </div>
      </aside>
      <div className="flex-col flex flex-1 ">
        <header className="header w-full shadow-sm  flex h-14 bg-white border-b border-gray-100 items-center justify-between px-4">
          <div
            className="cursor-pointer"
            onClick={() => setMenuUnfold(!menuUnfold)}
          >
            {menuUnfold ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </div>
          <div className="flex items-center">
            <Image src={userInfo.headUrl} className="mb-2 mr-4" width={48} />
            <div className="ml-4">{userInfo.name}</div>
          </div>
        </header>
        <main className="main flex-1 bg-gray-50  flex flex-col overflow-auto ">
          <div className=" p-3">
            <div className="h-10 bg-red-500">/sss</div>
            <div className="overflow-auto flex-1">
              {children}
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return <div className="mb-20 bg-cyan-200 h-96" key={item}></div>
              })}
            </div>
          </div>
        </main>
        <footer className="footer h-10 border-t border-gray-100 flex items-center justify-center text-gray-400 text-xs">
          <span className="text-md">©</span>&nbsp;2023年云信维修系统
        </footer>
      </div>
    </div>
  )
}
