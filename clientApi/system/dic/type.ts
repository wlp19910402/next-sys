//系统字段信息编辑或新增
export interface SysDicInfoParams {
  code: string //字典编码
  index?: string //字典顺序
  name?: string //字典名称
  sysDicTypeCode: string //字典类型编码
  sysDicTypeId?: string //字典类型ID
  id?: string //编辑的时候有
}
export interface SysDicListParams {
  current: number //当前页面
  code: string
  size: number //每页显示条数
}
