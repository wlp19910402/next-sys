export interface RequireSysRoleListParams {
  current: number //当前页面
  size: number //每页显示条数
}

// 解绑
export interface UserInfoParams {
  roleBind: boolean //绑定:true 解绑:false
  roleId: string
  userIdList: string[]
}
export interface UserListByRoleIdParams {
  current: number //当前页面
  size: number //每页显示条数
  roleBind: boolean
  roleId: string
}
