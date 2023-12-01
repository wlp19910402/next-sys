// import { getUserInfo } from '@/api/system/user/index'
// 导入二次封装axios
import axios from '@/utils/adminAxios.ts'
// 引入接口类型
import type { RequireSysUserListParams, UserInfoParams } from './type.js'
// import { ElMessageBox } from 'element-plus'
// 统一管理接口
enum API {
  DELETE_BY_ID = '/admin/AdminUserController/deleteById', //主键逻辑删除
  INFO_BY_ID = '/admin/AdminUserController/getById', //主键查询
  INSERT = '/admin/AdminUserController/insert', //主键查询
  PAGE_LIST = '/admin/AdminUserController/pageList', //分页查询
  UPDATE_BY_ID = '/admin/AdminUserController/updateById', //主键更新
}

//获取用户分页查询列表
export const fetchSysUserPageList = (params: RequireSysUserListParams) => {
  return axios.post(API.PAGE_LIST, params)
}
//删除用户
export const deleteSysUserById = (params: { id: string | number }) => {
  return axios.post(API.DELETE_BY_ID, params)
}
//编辑用户信息
export const updateSysUser = (params: UserInfoParams) => {
  return axios.post(API.UPDATE_BY_ID, params)
}

//新增用户信息
export const insertSysUser = (params: UserInfoParams) => {
  return axios.post(API.INSERT, params)
}

//查询用户信息
export const getSysUserInfo = (params: { id: string | number }) => {
  return axios.get(API.INFO_BY_ID, params)
}
