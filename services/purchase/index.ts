import axios from '@/utils/axios.ts'
// 引入接口类型
import type { PurchaseInfoParams, PurchaseListParams } from './type.js'
// 配件需求接口
enum API {
  PURCHASE_PAGE_LIST = '/PurchaseEventController/selectPage', //分页查询配件需求需求列表
  PURCHASE_INFO_BY_ID = '/PurchaseEventController/selectById', //ID查询配件需求基本信息
  // PURCHASE_UPDATE = '/PurchaseEventController/update', //修改配件需求基本信息
  // PURCHASE_INSERT = '/PurchaseEventController/insert', //新增配件需求基本信息
  // PURCHASE_DELETE_BY_ID = '/PurchaseEventController/deleteById', //ID删除配件需求基本信息
}

//分页查询配件需求信息
export const fetchPurchasePageList = (params: PurchaseListParams) => {
  return axios.post(API.PURCHASE_PAGE_LIST, params)
}
//新增配件需求
// export const insertPurchase = (params: PurchaseInfoParams) => {
//   return axios.post(API.PURCHASE_INSERT, params)
// }
// //编辑配件需求
// export const updatePurchase = (params: PurchaseInfoParams) => {
//   return axios.post(API.PURCHASE_UPDATE, params)
// }
// //删除配件需求
// export const deletePurchaseById = (params: { id: string }) => {
//   return axios.get(API.PURCHASE_DELETE_BY_ID, params)
// }
//查询配件需求基本信息
export const getPurchaseInfoById = (params: { id: string }) => {
  return axios.get(API.PURCHASE_INFO_BY_ID, params)
}
