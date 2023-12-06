interface RoleItemInterface {
  // id: string | number
  // isStop: boolean
  // createTime: string
  // orderNum: number
  // roleCode: string
  // roleName: string
  // updateTime: string
  value: string | number
  label: string
}
export interface RoleStateModel {
  roleList: RoleItemInterface[]
}

export interface WsResponseParams {
  type: string
  data: any
}
