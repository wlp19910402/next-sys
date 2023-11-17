// 登录接口需要携带的参数ts类型
// -- todo --
export interface WsResponseParams {
  type: string
  data: any
}

export interface RequireSysUserListParams {
  current: number //当前页面
  name: string
  openId: string
  phone: string
  size: number //每页显示条数
}

export interface UserInfoParams {
  openId: string //设备名称
  name: string //是否连接软件
  phone: string //备注
  id?: string //编辑的时候有
}
