//设备信息编辑或新增
export interface PrintMachineInfoParams {
  machineNo: string
  address?: string //设备位置
  cloudPrintService: boolean //是否安装云打印服务
  companyId: string //单位ID
  expirationDate?: string //过期时间质保止
  startDate?: string //质保时间起
  hardware?: string //硬件 读卡器 | 人脸识别器
  logo?: string //设备品牌
  machineModel: string //设备型号
  machineNameType: string //设备名称
  software: boolean //是否连接软件
  zhibao?: string //备注
  id?: string //编辑的时候有
}
export interface PrintMachineListParams {
  current: number //当前页面
  machineNo: string //设备6位唯一码
  companyId: string //单位ID
  size: number //每页显示条数
  isDelete?: number //逻辑删除 0正常数据 1已删除数据  null为全部
}
