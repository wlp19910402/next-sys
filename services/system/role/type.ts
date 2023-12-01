import { RoleInfoParams } from './type'
export interface RequireSysRoleListParams {
  current: number //当前页面
  size: number //每页显示条数
}

// 解绑
export interface MenuInfoParams {
  // roleBind: boolean //绑定:true 解绑:false
  roleId: string
  menuIds: string[] | number[]
}

export interface UserInfoParams {
  // roleBind: boolean //绑定:true 解绑:false
  roleId: string
  userIds: string[] | number[]
}

export interface UserListByRoleIdParams {
  current: number //当前页面
  size: number //每页显示条数
  roleBind: boolean
  roleId: string
}

export interface RoleInfoParams {
  id: string | number
  isStop: boolean
  orderNum: number
  roleCode: string
  roleName: string
}
// export interface RoleInfoParams
