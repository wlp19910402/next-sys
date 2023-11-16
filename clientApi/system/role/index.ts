import axios from '@/utils/axios.ts'
// 引入接口类型
import type {
  UserListByRoleIdParams,
  RequireSysRoleListParams,
  UserInfoParams,
} from './type.ts'
// 统一管理接口
enum API {
  SYS_ROLE_PAGE_LIST = '/SysRoleController/selectPage', //分页查询角色列表
  USER_LIST_BY_ROLE_ID = '/SysRoleController/selectUserListByRoleId', //根据角色ID查询全部用户
  UPDATE_ROLE_BIND_USER = '/SysRoleController/updateRoleUsers', //用户角色关系(绑定|解绑)
}

//分页查询角色列表
export const fetchSysRolePageList = (params: RequireSysRoleListParams) => {
  return axios.post(API.SYS_ROLE_PAGE_LIST, params)
}
//根据角色ID查询全部用户
export const fetchUserListByRoleId = (params: UserListByRoleIdParams) => {
  return axios.post(API.USER_LIST_BY_ROLE_ID, params)
}
//用户角色关系(绑定|解绑)
export const updateRoleBindUser = (params: UserInfoParams) => {
  return axios.post(API.UPDATE_ROLE_BIND_USER, params)
}
