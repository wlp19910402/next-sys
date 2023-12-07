//系统字段信息编辑或新增
type IdParams = number | string
export interface SysDicInfoParams {
  dictCode: string
  dictName: string
  isExpand?: boolean
  isHidden?: boolean
  isLeaf?: boolean
  orderNum: number
  parentId: IdParams
  typeCode: string
  id?: IdParams //编辑的时候有
}
export interface SysDicListParams {
  current: number //当前页面
  size: number //每页显示条数
  dictTypeCode: string

  isHidden?: boolean //是否隐藏
  dictCode?: string
}
