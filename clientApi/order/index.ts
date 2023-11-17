import axios from '@/utils/axios.ts'
// 引入接口类型
import type { RequireOrderListParams, SubmitTaskParams } from './type.ts'
// 统一管理接口
enum API {
  //工单
  GET_ALL_LIST = '/FlowApiController/getAllFlowList', //查询全部工单列表
  ORDER_MAINTAIN_CREATE = '/FlowApiController/createMaintainFlow', //创建维修工单
  ORDER_ORTHER_CREATE = '/FlowApiController/createOtherFlow', //创建培训工单
  ORDER_REQUIRE_WAITING_LIST = '/FlowApiController/getWaitingList', //查询待处理的工单列表
  ORDER_REQUIRE_PROCESSING_LIST = '/FlowApiController/getProcessingList', //查询处理中的工单列表
  ORDER_REQUIRE_PASSING_LIST = '/FlowApiController/getPassingList', //查询已处理的工单列表
  ORDER_REQUIRE_COMPLETE_LIST = '/FlowApiController/getCompleteList', //查询已完成的工单列表
  ORDER_REQUIRE_PROCESS_DIAGRAM = '/FlowApiController/getProcessDiagram', //查询工单流程图
  GET_TASK_INFO = '/FlowApiController/getTaskInfo', //获取任务信息
  GET_FLOW_INFO = '/FlowApiController/getFlowInfo', //获取流程信息
  SUBMIT_TASK = '/FlowApiController/submitTask', //提交任务
  SUBMIT_MAINTAIN_TASK = '/FlowApiController/submitMaintainTask', //工程师提交维修工单任务
  SUBMIT_ORTHER_TASK = '/FlowApiController/submitOtherTask', //提交其它工单任务

  SUBMIT_MAINTAIN_REPORT = '/FlowApiController/submitMaintainReport', // 提交(维修 | 装移机 | 巡检)报告单
  GET_MAINTAIN_REPORT = '/FlowApiController/getMaintainReport', // 查询(维修|装移机|巡检)报告单

  SUBMIT_TRAIN_REPORT = '/FlowApiController/submitTrainReport', //提交(培训)报告单
  GET_TARIN_REPORT = '/FlowApiController/getTrainReport', // 查询(培训)报告单
}
//查询全部工单列表
export const fetchAllOrderList = (params: RequireOrderListParams) => {
  return axios.post(API.GET_ALL_LIST, params)
}

//创建维修工单
export const createMaintainOrder = (params: any) => {
  return axios.post(API.ORDER_MAINTAIN_CREATE, params)
}
//创建培训工单
export const createOtherOrder = (params: any) => {
  return axios.post(API.ORDER_ORTHER_CREATE, params)
}
//查询待处理的工单列表
export const fetchWaitingOrderList = (params: RequireOrderListParams) => {
  return axios.post(API.ORDER_REQUIRE_WAITING_LIST, params)
}
//查询执行中工单列表
export const fetchProcessingOrderList = (params: RequireOrderListParams) => {
  return axios.post(API.ORDER_REQUIRE_PROCESSING_LIST, params)
}
//查询已处理的工单列表
export const fetchPassingOrderList = (params: RequireOrderListParams) => {
  return axios.post(API.ORDER_REQUIRE_PASSING_LIST, params)
}
//查询已完成的工单列表
export const fetchCompleteOrderList = (params: RequireOrderListParams) => {
  return axios.post(API.ORDER_REQUIRE_COMPLETE_LIST, params)
}
//查询工单流程图
export const getProcessDiagram = async (params: { processId: string }) => {
  return await axios
    .getBlob(API.ORDER_REQUIRE_PROCESS_DIAGRAM, params)
    .then((res: any) => {
      let blob = new Blob([res], { type: 'image/png,base64' })
      let url = window.URL.createObjectURL(blob)
      return url
    })
    .catch((error) => {
      console.log(error)
      return ''
    })
}
//获取任务信息
export const getTaskInfo = (params: { taskId: string }) => {
  return axios.get(API.GET_TASK_INFO, params)
}
//获取流程信息
export const getFlowInfo = (params: { id: string }) => {
  return axios.get(API.GET_FLOW_INFO, params)
}
export const fetchSubmitTask = (params: SubmitTaskParams) => {
  return axios.post(API.SUBMIT_TASK, params)
}
// 提交维修工单任务
export const fetchSubmitMaintainTask = (params: any) => {
  return axios.post(API.SUBMIT_MAINTAIN_TASK, params)
}
// 提交其他工单任务
export const fetchSubmitOrtherTask = (params: any) => {
  return axios.post(API.SUBMIT_ORTHER_TASK, params)
}

// 提交(维修 | 装移机 | 巡检)报告单
export const fetchSubmitMaintaiReport = (params: any) => {
  return axios.post(API.SUBMIT_MAINTAIN_REPORT, params)
}
// 查询(维修|装移机|巡检)报告单
export const getMaintainReportInfo = (params: any) => {
  return axios.get(API.GET_MAINTAIN_REPORT, params)
}
// 提交(培训))报告单
export const fetchSubmitTarinReport = (params: any) => {
  return axios.post(API.SUBMIT_TRAIN_REPORT, params)
}
// 查询(培训)报告单
export const getTarinReportInfo = (params: any) => {
  return axios.get(API.GET_TARIN_REPORT, params)
}

export default {
  fetchWaitingOrderList,
  fetchCompleteOrderList,
  fetchPassingOrderList,
  fetchProcessingOrderList,
  fetchAllOrderList,
}
