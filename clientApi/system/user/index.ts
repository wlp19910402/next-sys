// 导入二次封装axios
import axios from '@/utils/axios.ts'
// 引入接口类型
import type { RequireSysUserListParams, UserInfoParams } from './type.ts'
import { ElMessageBox } from 'element-plus'
// 统一管理接口
enum API {
  //微信登录
  WX_API_LOGIN_CODE = '/WxApiController/getLoginQrCode',
  WX_API_LOGIN = '/WxApiController/login',
  WX_AUTO_TOKEN_TO_USERINFO = '/WxApiController/getUserInfo',
  WX_LOGOUT = '/WxApiController/logout',
  WX_UPDATE_USER_INFO = '/WxApiController/updateUserInfo', //修改当前登录用户信息
  //用户
  GET_SALES_LIST = '/SysUserController/selectSalesList', //查询销售人员列表
  GET_ALL_LIST = '/SysUserController/selectAllUsers', //查询全部人员列表
  SYS_USER_PAGE_LIST = '/SysUserController/selectPage', //分页查询用户列表
  SYS_USER_DELETE_BY_ID = '/SysUserController/deleteById', //根据ID禁用用户
  SYS_USER_UPDATE = '/SysUserController/update', //修改用户基本信息
}
//获取生成二维码code
export const getWxLoginCode = (params: { channelId: string }) => {
  return axios.get(API.WX_API_LOGIN_CODE, params)
}
// 根据wx返回的token进行获取用户信息
export const fetchWxLogin = (params: { code: string; type: string }) => {
  return axios.post(API.WX_API_LOGIN, params)
}
//根据auth_token获取用户信息
export const getUserInfo = () => {
  return axios.get(API.WX_AUTO_TOKEN_TO_USERINFO)
}
export const fetchLogout = () => {
  return axios.get(API.WX_LOGOUT)
}
// 修改当前登录用户信息
export const fetchWxUpdateUserInfo = (params: {
  headUrl: string
  name: string
  phone: string
}) => {
  return axios.post(API.WX_UPDATE_USER_INFO, params)
}

//获取销售人员列表
export const getSalesList = () => {
  return axios.get(API.GET_SALES_LIST)
}
//获取全部人员列表
export const getAllList = () => {
  return axios.get(API.GET_ALL_LIST)
}

//获取用户分页查询列表
export const fetchSysUserPageList = (params: RequireSysUserListParams) => {
  return axios.post(API.SYS_USER_PAGE_LIST, params)
}
//删除用户
export const deleteSysUserById = (params: { id: string }) => {
  return axios.get(API.SYS_USER_DELETE_BY_ID, params)
}
//编辑用户信息
export const updateSysUser = (params: UserInfoParams) => {
  return axios.post(API.SYS_USER_UPDATE, params)
}
