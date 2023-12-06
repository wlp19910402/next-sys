import axios from '@/utils/adminAxios.ts'
// 引入接口类型
import type {
  UserListByRoleIdParams,
  RequireSysRoleListParams,
  MenuInfoParams,
  RoleInfoParams,
  UserInfoParams,
} from './type.ts'
// 统一管理接口
enum API {
  SYS_ROLE_PAGE_LIST = '/SysRoleController/selectPage', //分页查询角色列表
  USER_LIST_BY_ROLE_ID = '/SysRoleController/selectUserListByRoleId', //根据角色ID查询全部用户

  DELETE_BY_ID = '/admin/AdminRoleController/deleteById', //主键逻辑删除
  INFO_BY_ID = '/admin/AdminRoleController/getById', //主键查询
  INSERT = '/admin/AdminRoleController/insert', //主键查询
  PAGE_LIST = '/admin/AdminRoleController/pageList', //分页查询
  UPDATE_BY_ID = '/admin/AdminRoleController/updateById', //主键更新
  ROLE_BIND_USERS = '/admin/AdminRoleController/addRoleUserMapping', //角色用户绑定
  ROLE_DEL_BIND_USERS = '/admin/AdminRoleController/delRoleUserMapping', //角色用户绑定
  ROLE_BIND_MENUS = '/admin/AdminRoleController/addRoleMenuMapping', //角色绑定菜单
  ROLE_DEL_BIND_MENUS = '/admin/AdminRoleController/delRoleMenuMapping', //角色解绑菜单
}

//分页查询角色列表
export const fetchSysRolePageList = (params: RequireSysRoleListParams) => {
  return axios.post(API.PAGE_LIST, params)
}
//删除用户
export const deleteSysRoleById = (params: { id: string | number }) => {
  return axios.post(API.DELETE_BY_ID, params)
}
//编辑用户信息
export const updateSysRole = (params: RoleInfoParams) => {
  return axios.post(API.UPDATE_BY_ID, params)
}

//新增用户信息
export const insertSysRole = (params: RoleInfoParams) => {
  return axios.post(API.INSERT, params)
}

//查询用户信息
export const getSysRoleInfo = (params: { id: string | number }) => {
  return axios.get(API.INFO_BY_ID, params)
}

//根据角色ID查询全部用户
export const fetchUserListByRoleId = (params: UserListByRoleIdParams) => {
  return axios.post(API.USER_LIST_BY_ROLE_ID, params)
}
//用户角色关系(绑定|解绑)
export const updateRoleDelBindUser = (params: UserInfoParams) => {
  return axios.post(API.ROLE_DEL_BIND_USERS, params)
}
//用户角色关系(绑定|解绑)
export const updateRoleBindUser = (params: UserInfoParams) => {
  return axios.post(API.ROLE_BIND_USERS, params)
}
//菜单角色关系(绑定|解绑)
export const updateRoleDelBindMenu = (params: MenuInfoParams) => {
  return axios.post(API.ROLE_DEL_BIND_MENUS, params)
}
//菜单角色关系(绑定|解绑)
export const updateRoleBindMenu = (params: MenuInfoParams) => {
  return axios.post(API.ROLE_BIND_MENUS, params)
}
