import axios from '@/utils/axios.ts'
// 引入接口类型
import type { SysDicInfoParams, SysDicListParams } from './type.ts'
// 系统字段接口
enum API {
  DELETE_BY_ID = '/admin/AdminDictController/deleteById', //主键逻辑删除
  INFO_BY_ID = '/admin/AdminDictController/getById', //主键查询
  INSERT = '/admin/AdminDictController/insert', //主键查询
  PAGE_LIST = '/admin/AdminDictController/pageList', //分页查询
  UPDATE_BY_ID = '/admin/AdminDictController/updateById', //主键更新
  TREE_LIST = '/admin/AdminDictController/treeListAll', //树形结构字典列表查询
  COMBO_LIST = '/admin/AdminDictController/comboListAll', //普通结构字典列表查询
}

//分页查询列表
export const fetchSysDicPageList = (params: SysDicListParams) => {
  return axios.post(API.PAGE_LIST, params)
}
//删除
export const deleteSysDicById = (params: { id: string | number }) => {
  return axios.post(API.DELETE_BY_ID, params)
}
//编辑信息
export const updateSysDic = (params: SysDicInfoParams) => {
  return axios.post(API.UPDATE_BY_ID, params)
}

//新增信息
export const insertSysDic = (params: SysDicInfoParams) => {
  return axios.post(API.INSERT, params)
}

//详细信息
export const getSysDicInfo = (params: { id: string | number }) => {
  return axios.get(API.INFO_BY_ID, params)
}

//树形结构字典列表查询
export const getSysDicTreeList = (params: {
  dictTypeCode: string | number
}) => {
  return axios.get(API.TREE_LIST, params)
}
// 普通结构字典列表查询
export const getSysDicComboList = (params: {
  dictTypeCode: string | number
}) => {
  return axios.get(API.COMBO_LIST, params)
}
