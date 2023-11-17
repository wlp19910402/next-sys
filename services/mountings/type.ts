//配件信息编辑或新增
export interface MountingsInfoParams {
  chineseName: string
  code: string
  englishName: string
  machineModel: string //
  zhibao?: string //备注
  order: number
  type: string
  id?: string //编辑的时候有
}
export interface MountingsListParams {
  current: number //当前页面
  size: number //每页显示条数
  code: string
  machineModel: string
  type: string
  isDelete: boolean
}
