// 用户列表
export interface PageBaseParams {
  current: number
  size: number
}

export interface RequireSysUserListParams extends PageBaseParams {
  isDelete?: boolean
  loginName?: string
  roleId?: number | string
  roleQueryType?: string | number
  userPhone?: number | string
}

export interface UserInfoParams {
  avatarUrl?: string
  id?: number | string
  isDelete?: boolean | string
  isUpdatePwd?: boolean
  loginName?: string
  orderNum?: number
  password?: string
  roleIdList: string[] | []
  userName: string
  userPhone: number | string | null
}
