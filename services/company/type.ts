//单位分页查询
export interface RequireCompanyListParams {
  current: number //当前页面
  cityCode: string //城市code
  provinceCode: string //省code
  size: number //每页显示条数
}
//单位信息编辑或新增
export interface CompanyInfoParams {
  cityCode: string
  companyAddress: string
  companyAdmin: string
  companyName: string
  companyTel: string
  provinceCode: string
  salesId: string
  id?: string //编辑的时候有
}
// 获取根据省市区的编号获取单位列表
export interface CompanyListByPositionParams {
  cityCode: string
  provinceCode: string
}
