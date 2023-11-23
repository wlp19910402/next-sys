'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { Menu, Image, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { GlobalContext } from '@/app/layout'
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
  const globalContext = useContext<any>(GlobalContext)
  return (
    <aside
      className={`h-full bg-white overflow-auto flex flex-col border-slate-100 border-r-2 border-solid ${
        props.menuUnfold && !globalContext.isMobile ? 'w-64' : 'w-18'
      }`}
    >
      <Link className="flex items-center h-14 pl-4  " href="/sys/home">
        <Image src="/logo.png" alt="logo" className="mb-2" width={48} />
        {props.menuUnfold && !globalContext.isMobile && (
          <span className="mx-3 text-base text-gray-600">云信信息管理系统</span>
        )}
      </Link>
      <div className="flex-1 overflow-auto">
        <Menu
          onClick={onClick}
          inlineCollapsed={!props.menuUnfold || globalContext.isMobile}
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['/sys/order/processing']}
          mode="inline"
          className="border-none shadow-none qm-border-inline-none"
          items={items}
        />
      </div>
    </aside>
  )
}
