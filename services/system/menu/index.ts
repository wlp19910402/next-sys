import axios from '@/utils/adminAxios.ts'
// 引入接口类型
import type { SysMenuInfoParams } from './type.ts'
// 系统字段接口
enum API {
  DELETE_BY_ID = '/admin/AdminMenuController/deleteById', //主键逻辑删除
  INFO_BY_ID = '/admin/AdminMenuController/getById', //主键查询
  INSERT = '/admin/AdminMenuController/insert', //主键查询
  UPDATE_BY_ID = '/admin/AdminMenuController/updateById', //主键更新
  TREE_LIST = '/admin/AdminMenuController/treeList', //树形结构字典列表查询
  TREE_LIST_BY_USER_ID = '/admin/AdminMenuController/treeListByUserId',
  // COMBO_LIST = '/admin/AdminMenuController/comboList', //普通结构字典列表查询
}

//删除
export const deleteSysMenuById = (params: { id: string | number }) => {
  return axios.post(API.DELETE_BY_ID, params)
}
//编辑信息
export const updateSysMenu = (params: SysMenuInfoParams) => {
  return axios.post(API.UPDATE_BY_ID, params)
}

//新增信息
export const insertSysMenu = (params: SysMenuInfoParams) => {
  return axios.post(API.INSERT, params)
}

//详细信息
export const getSysMenuInfo = (params: { id: string | number }) => {
  return axios.get(API.INFO_BY_ID, params)
}

//树形结构字典列表查询
export const getSysMenuTreeList = (params: { roleId: string | number }) => {
  return axios.get(API.TREE_LIST, params)
}
// 普通结构字典列表查询
// export const getSysMenuComboList = (params: {
//   MenutTypeCode: string | number
// }) => {
//   return axios.get(API.COMBO_LIST, params)
// }

export const getSysMenuTreeListByUserId = (params: {
  userId: string | number
}) => {
  return axios.get(API.TREE_LIST_BY_USER_ID, params)
}
