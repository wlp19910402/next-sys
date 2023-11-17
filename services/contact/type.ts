//全域联系法官一体机设备信息编辑或新增
export interface ContactMachineInfoParams {
  companyId: string //单位ID
  expirationDate?: string //过期时间质保止
  startDate?: string //质保时间起
  machineName: string //全域联系法官一体机设备名称
  zhibao?: string //备注
  id?: string //编辑的时候有
}
export interface ContactMachineListParams {
  current: number //当前页面
  companyId: string //单位ID
  size: number //每页显示条数
  isDelete?: number //逻辑删除 0正常数据 1已删除数据  null为全部
}
