//系统字段信息编辑或新增
type IdParams = number | string
export interface SysMenuInfoParams {
  bindRoleId?: string | number
  children?: SysMenuInfoParams[] | []
  code: string
  icon: string
  isBindRole?: boolean
  name: string
  isExpand?: boolean
  isHidden?: boolean
  isLeaf?: boolean
  orderNum: number
  parentId: IdParams
  path: string
  id?: IdParams //编辑的时候有
}
export interface SyMenuListParams {
  current: number //当前页面
  size: number //每页显示条数
  typeCode: string

  isHidden?: boolean //是否隐藏
  dictCode?: string
}
