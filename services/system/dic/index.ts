import axios from '@/utils/axios.ts'
// 引入接口类型
import type { SysDicInfoParams, SysDicListParams } from './type.js'
// 系统字段接口
enum API {
  SYS_DIC_PAGE_LIST = '/SysDicController/selectPage', //分页查询系统字段信息
  SYS_DIC_UPDATE = '/SysDicController/update', //修改系统字段基本信息
  SYS_DIC_INSERT = '/SysDicController/insert', //新增系统字段基本信息
  SYS_DIC_DELETE_BY_ID = '/SysDicController/deleteById', //ID删除系统字段基本信息
  SYS_DIC_INFO_BY_ID = '/SysDicController/selectById', //ID查询系统字段基本信息
  SYS_DIC_TYPE_LIST = '/SysDicController/getDicTypeList', //查询字典分类列表
  SYS_DIC_LIST = '/SysDicController/selectList', //查询字典信息列表
}

//分页查询系统类型字段信息
export const fetchSysDicTypePageList = () => {
  return axios.get(API.SYS_DIC_TYPE_LIST)
}
//分页查询系统字段信息
export const fetchSysDicPageList = (params: SysDicListParams) => {
  return axios.post(API.SYS_DIC_PAGE_LIST, params)
}
//新增系统字段
export const insertSysDic = (params: SysDicInfoParams) => {
  return axios.post(API.SYS_DIC_INSERT, params)
}
//编辑系统字段
export const updateSysDic = (params: SysDicInfoParams) => {
  return axios.post(API.SYS_DIC_UPDATE, params)
}
//删除系统字段
export const deleteSysDicById = (params: { id: string; stop: boolean }) => {
  return axios.get(API.SYS_DIC_DELETE_BY_ID, params)
}
//查询系统字段基本信息
export const getSysDicInfoById = (params: { id: string }) => {
  return axios.get(API.SYS_DIC_INFO_BY_ID, params)
}

// 获取故障类型的所有数据
export const getSysDicListByCode = (params: { code: string }) => {
  return axios.get(API.SYS_DIC_LIST, params)
}
