// 登录接口需要携带的参数ts类型
// -- todo --
export interface WsResponseParams {
  type: string
  data: any
}

export interface RequireOrderListParams {
  current: number //当前页面
  endDay: string //结束日期
  startDay: string //开始日期
  flowType: string //流程类型'maintain'
  size: number //每页显示条数
}
export interface SubmitTaskParams {
  explain: string //办理结果
  flowableInstId: string //流程实例ID
  input: string
  taskId: string //当前任务节点ID
  userId: string //下一步处理人ID
}

export interface RequireAllOrderListParams {
  current: number //当前页面
  size: number //每页显示条数
  companyId?: string
  complete?: string //是否完成
  initiatorId?: string //工单发起人
  salesId?: string
  endDay?: string //结束日期
  startDay?: string //开始日期
  flowType?: string //流程类型'maintain'
}
