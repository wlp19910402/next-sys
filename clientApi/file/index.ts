import axios from '@/utils/axios.ts'
// 引入接口类型
// import type {
//   ContactMachineInfoParams,
//   ContactMachineListParams,
// } from './type.ts'
// 全域联系法官一体机设备接口
enum API {
  // FILES_UPLOAD = '/files/upload', //上传文件  --TODO自己服务器
  FILE_UPLOAD_IMAGE = '/FileController/uploadImage',
}

//分页查询全域联系法官一体机设备信息
// export const fetchUploadServer = (params: any) => {
//   return axios.post(API.FILES_UPLOAD, params)
// }

export const fetchUploadServer = (params: any) => {
  return axios.post(API.FILE_UPLOAD_IMAGE, params)
}
