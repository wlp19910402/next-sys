import axios from '@/utils/axios.ts'
// 引入接口类型
import type {
  ContactMachineInfoParams,
  ContactMachineListParams,
} from './type.js'
// 全域联系法官一体机设备接口
enum API {
  CONTACT_MACHINE_PAGE_LIST = '/ContactMachineController/selectPage', //分页查询全域联系法官一体机设备信息
  CONTACT_MACHINE_UPDATE = '/ContactMachineController/update', //修改全域联系法官一体机设备基本信息
  CONTACT_MACHINE_INSERT = '/ContactMachineController/insert', //新增全域联系法官一体机设备基本信息
  CONTACT_MACHINE_DELETE_BY_ID = '/ContactMachineController/deleteById', //ID删除全域联系法官一体机设备基本信息
  CONTACT_MACHINE_INFO_BY_ID = '/ContactMachineController/selectById', //ID查询全域联系法官一体机设备基本信息
}

//分页查询全域联系法官一体机设备信息
export const fetchContactMachinePageList = (
  params: ContactMachineListParams
) => {
  return axios.post(API.CONTACT_MACHINE_PAGE_LIST, params)
}
//新增全域联系法官一体机设备
export const insertContactMachine = (params: ContactMachineInfoParams) => {
  return axios.post(API.CONTACT_MACHINE_INSERT, params)
}
//编辑全域联系法官一体机设备
export const updateContactMachine = (params: ContactMachineInfoParams) => {
  return axios.post(API.CONTACT_MACHINE_UPDATE, params)
}
//删除全域联系法官一体机设备
export const deleteContactMachineById = (params: { id: string }) => {
  return axios.get(API.CONTACT_MACHINE_DELETE_BY_ID, params)
}
//查询全域联系法官一体机设备基本信息
export const getContactMachineInfoById = (params: { id: string }) => {
  return axios.get(API.CONTACT_MACHINE_INFO_BY_ID, params)
}
