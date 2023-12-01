export interface SysDicTypeInfoParams {
  dictStruct: 'combo' | 'tree' //字典结构  combo|tree
  orderNum?: number //字典顺序
  typeName?: string //字典名称
  id?: string | number //编辑的时候有
  typeCode: string //字典类型编码
}
export interface SysDicTypeListParams {
  current: number //当前页面
  size: number //每页显示条数
}
