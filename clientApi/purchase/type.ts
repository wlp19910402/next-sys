//配件信息编辑或新增
export interface PurchaseInfoParams {
  chineseName: string
  code: string
  englishName: string
  machineModel: string //
  zhibao?: string //备注
  order: number
  type: string
  id?: string //编辑的时候有
}
export interface PurchaseListParams {
  current: number //当前页面
  size: number //每页显示条数
  machineNo: string //设备6位唯一码
  companyId: string //单位ID
  endDate: string
  startDate: string
}
