import axios from '@/utils/axios.ts'
// 引入接口类型
import type {
  RequireCompanyListParams,
  CompanyInfoParams,
  CompanyListByPositionParams,
} from './type.ts'
// 单位接口
enum API {
  COMPANY_PAGE_LIST = '/CompanyController/selectPage', //分页查询单位信息
  COMPANY_UPDATE = '/CompanyController/update', //修改单位基本信息
  COMPANY_INSERT = '/CompanyController/insert', //新增单位基本信息
  COMPANY_DELETE_BY_ID = '/CompanyController/deleteById', //ID删除单位基本信息
  COMPANY_INFO_BY_ID = '/CompanyController/selectById', //ID查询单位基本信息
  COMPANY_LIST_BY_POSITION = '/CompanyController/getListByPosition', //根据城市code获取单位信息
}

//分页查询单位信息
export const fetchCompnayPageList = (params: RequireCompanyListParams) => {
  return axios.post(API.COMPANY_PAGE_LIST, params)
}
//新增单位
export const insertCompany = (params: CompanyInfoParams) => {
  return axios.post(API.COMPANY_INSERT, params)
}
//编辑单位
export const updateCompany = (params: CompanyInfoParams) => {
  return axios.post(API.COMPANY_UPDATE, params)
}
//删除单位
export const deleteCompanyById = (params: { id: string }) => {
  return axios.get(API.COMPANY_DELETE_BY_ID, params)
}
//查询单位基本信息
export const getCompanyInfoById = (params: { id: string }) => {
  return axios.get(API.COMPANY_INFO_BY_ID, params)
}

// 根据城市行政区域编号获取设备位置列表
export const getCompanyListByPosition = (
  params: CompanyListByPositionParams
) => {
  return axios.get(API.COMPANY_LIST_BY_POSITION, params)
}
