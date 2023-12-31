'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useState } from 'react'
import { Menu, Image, Typography } from 'antd'
import type { MenuProps, MenuTheme } from 'antd'
import { GlobalContext } from '@/app/layout'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Link } = Typography
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

export default function Cmp(props: { menuUnfold: boolean }) {
  const items: MenuProps['items'] = [
    getItem('首页', '/home', <MailOutlined />),
    getItem('系统管理', '/sys', <AppstoreOutlined />, [
      getItem('用户管理', '/sys/user', <MailOutlined />),
      getItem('字典类型管理', '/sys/dictype', <MailOutlined />),
      getItem('字典管理', '/sys/dic', <MailOutlined />),
      getItem('菜单管理', '/sys/menu', <MailOutlined />),
      getItem('角色管理', '/sys/role', <MailOutlined />),
    ]),
  ]
  const router = useRouter()

  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e.key, router)
    router.push(e.key)
  }
  const globalContext = useContext<any>(GlobalContext)
  const [menuTheme, setmenuTheme] = useState<MenuTheme>('dark')
  return (
    <aside
      className={`h-full bg-white overflow-auto flex flex-col border-slate-100 border-r border-solid ${
        props.menuUnfold && !globalContext.isMobile ? 'w-64' : 'w-18'
      } ${menuTheme == 'dark' ? 'dark-bg' : ''}`}
    >
      <Link
        className={`flex items-center h-14 pl-4  border-solid border-b border-slate-100 ${
          menuTheme == 'dark' ? 'border-slate-700' : 'border-slate-100'
        }`}
        href="/sys/home"
      >
        <Image src="/logo.png" alt="logo" className="mb-2" width={48} />
        {props.menuUnfold && !globalContext.isMobile && (
          <span
            className={`mx-3 text-base  ${
              menuTheme == 'dark' ? 'text-white' : 'text-gray-600'
            }`}
          >
            云信信息管理系统
          </span>
        )}
      </Link>

      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto">
          <Menu
            onClick={onClick}
            inlineCollapsed={!props.menuUnfold || globalContext.isMobile}
            defaultSelectedKeys={[router.pathname]}
            defaultOpenKeys={['/sys/order/processing']}
            mode="inline"
            theme={menuTheme}
            className="border-none shadow-none qm-border-inline-none"
            items={items}
          />
        </div>
        <button
          className={`border-solid py-2 border-t border-slate-100 text-sm text-gray-400 ${
            menuTheme == 'dark' ? 'border-slate-700' : 'border-slate-100'
          }`}
          onClick={() => setmenuTheme(menuTheme == 'dark' ? 'light' : 'dark')}
        >
          切换菜单主题
        </button>
      </div>
    </aside>
  )
}
