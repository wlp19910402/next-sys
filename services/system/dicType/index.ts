import axios from '@/utils/axios.ts'
// 引入接口类型
import type { SysDicTypeInfoParams, SysDicTypeListParams } from './type.ts'
// 系统字段接口
enum API {
  DELETE_BY_ID = '/admin/AdminDictTypeController/deleteById', //主键逻辑删除
  INFO_BY_ID = '/admin/AdminDictTypeController/getById', //主键查询
  INSERT = '/admin/AdminDictTypeController/insert', //主键查询
  PAGE_LIST = '/admin/AdminDictTypeController/pageList', //分页查询
  UPDATE_BY_ID = '/admin/AdminDictTypeController/updateById', //主键更新
}

//分页查询列表
export const fetchSysDicTypePageList = (params: SysDicTypeListParams) => {
  return axios.post(API.PAGE_LIST, params)
}
//删除
export const deleteSysDicTypeById = (params: { id: string | number }) => {
  return axios.post(API.DELETE_BY_ID, params)
}
//编辑信息
export const updateSysDicType = (params: SysDicTypeInfoParams) => {
  return axios.post(API.UPDATE_BY_ID, params)
}

//新增信息
export const insertSysDicType = (params: SysDicTypeInfoParams) => {
  return axios.post(API.INSERT, params)
}

//查询信息
export const getSysDicTypeInfo = (params: { id: string | number }) => {
  return axios.get(API.INFO_BY_ID, params)
}
