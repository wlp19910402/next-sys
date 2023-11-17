import axios from '@/utils/axios.ts'
// 引入接口类型
import type { MountingsInfoParams, MountingsListParams } from './type.js'
// 配件接口
enum API {
  MOUNTINGS_PAGE_LIST = '/MountingsController/selectPage', //分页查询配件信息
  MOUNTINGS_UPDATE = '/MountingsController/update', //修改配件基本信息
  MOUNTINGS_INSERT = '/MountingsController/insert', //新增配件基本信息
  MOUNTINGS_DELETE_BY_ID = '/MountingsController/deleteById', //ID删除配件基本信息
  MOUNTINGS_INFO_BY_ID = '/MountingsController/selectById', //ID查询配件基本信息
}

//分页查询配件信息
export const fetchMountingsPageList = (params: MountingsListParams) => {
  return axios.post(API.MOUNTINGS_PAGE_LIST, params)
}
//新增配件
export const insertMountings = (params: MountingsInfoParams) => {
  return axios.post(API.MOUNTINGS_INSERT, params)
}
//编辑配件
export const updateMountings = (params: MountingsInfoParams) => {
  return axios.post(API.MOUNTINGS_UPDATE, params)
}
//删除配件
export const deleteMountingsById = (params: { id: string }) => {
  return axios.get(API.MOUNTINGS_DELETE_BY_ID, params)
}
//查询配件基本信息
export const getMountingsInfoById = (params: { id: string }) => {
  return axios.get(API.MOUNTINGS_INFO_BY_ID, params)
}
