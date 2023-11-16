import axios from '@/utils/axios.ts'
// 引入接口类型
import type { PrintMachineInfoParams, PrintMachineListParams } from './type.ts'
// 设备接口
enum API {
  PRINT_MACHINE_PAGE_LIST = '/PrintMachineController/selectPage', //分页查询设备信息
  PRINT_MACHINE_UPDATE = '/PrintMachineController/update', //修改设备基本信息
  PRINT_MACHINE_INSERT = '/PrintMachineController/insert', //新增设备基本信息
  PRINT_MACHINE_DELETE_BY_ID = '/PrintMachineController/deleteById', //ID删除设备基本信息
  PRINT_MACHINE_INFO_BY_ID = '/PrintMachineController/selectById', //ID查询设备基本信息
  GET_BASIC_INFO_BY_MACHINE_N0 = '/PrintMachineController/getBasicInfo', //获取填报基本信息
  GET_INFO_BY_MACHINE_NO = '/PrintMachineController/getByMachineNo', //设备码查询设备信息
}

//分页查询设备信息
export const fetchPrintMachinePageList = (params: PrintMachineListParams) => {
  return axios.post(API.PRINT_MACHINE_PAGE_LIST, params)
}
//新增设备
export const insertPrintMachine = (params: PrintMachineInfoParams) => {
  return axios.post(API.PRINT_MACHINE_INSERT, params)
}
//编辑设备
export const updatePrintMachine = (params: PrintMachineInfoParams) => {
  return axios.post(API.PRINT_MACHINE_UPDATE, params)
}
//删除设备
export const deletePrintMachineById = (params: { id: string }) => {
  return axios.get(API.PRINT_MACHINE_DELETE_BY_ID, params)
}
//查询设备基本信息
export const getPrintMachineInfoById = (params: { id: string }) => {
  return axios.get(API.PRINT_MACHINE_INFO_BY_ID, params)
}
//根据设备编号查询设备的基本信息
export const getBasicInfoByMachineNo = (params: { machineNo: string }) => {
  return axios.get(API.GET_BASIC_INFO_BY_MACHINE_N0, params)
}
//设备码查询设备信息
export const getInfoByMachineNo = (params: { machineNo: string }) => {
  return axios.get(API.GET_INFO_BY_MACHINE_NO, params)
}
