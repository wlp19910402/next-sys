'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import { fetchSysUserPageList } from '@/services/system/user'
import { Image } from 'antd'
export default function Page() {
  const columns:
    | ProColumns<
        {
          id: any
        },
        string
      >[]
    | undefined = [
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   key: 'index',
    //   width: 120,
    //   fixed: 'left',
    // },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      hideInSearch: true,
      width: '40',
      align: 'center',
      fixed: 'left',
      key: 'avatarUrl',
      render: (val: any) => (
        <Image
          alt="头像"
          width={40}
          src={val}
          fallback="data:image/png;base64,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"
        />
      ),
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '登录名称',
      dataIndex: 'loginName',
      width: 120,
      key: 'loginName',
    },
    {
      title: '联系方式',
      dataIndex: 'userPhone',
      width: 120,
      key: 'userPhone',
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      width: 80,
      align: 'center',
      key: 'orderNum',
    },
    {
      title: '是否删除',
      dataIndex: 'isDelete',
      hideInSearch: true,
      width: 80,
      align: 'center',
      key: 'isDelete',
      render: (val: any) => (
        <div className={`h-10  ${val ? 'text-red-500' : 'text-green-400'}`}>
          {val ? '是' : '否'}
        </div>
      ),
    },

    // {
    //   title: '实名认证',
    //   key: 'accountAuth',
    //   width: 74,
    //   hideInSearch: true,
    //   dataIndex: 'accountAuth',
    //   // render: (val) => (val ? '已认证' : '未认证'),
    //   // renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //   //   if (type === 'form') {
    //   //     return null
    //   //   }
    //   //   return (
    //   //     <Select allowClear key="label">
    //   //       <Select.Option value={'true'}>已认证</Select.Option>
    //   //       <Select.Option value={'false'}>未认证</Select.Option>
    //   //     </Select>
    //   //   )
    //   // },
    // },
    // {
    //   title: '角色',
    //   key: 'roleId',
    //   dataIndex: 'roleList',
    //   // render: (val, record) => {
    //   //   return (
    //   //     <div>
    //   //       {Array.isArray(val) &&
    //   //         val.map((item, index) => (
    //   //           <Tag key={index} color="blue">
    //   //             {item.name}
    //   //           </Tag>
    //   //         ))}
    //   //     </div>
    //   //   )
    //   // },
    //   // renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //   //   if (type === 'form') {
    //   //     return null
    //   //   }
    //   //   return <Select allowClear options={roleData} key="label" />
    //   // },
    // },
    // {
    //   title: '微信角色',
    //   width: 80,
    //   key: 'wechatRole',
    //   dataIndex: 'wechatRoleName',
    //   hideInSearch: true,
    //   // renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //   //   if (type === 'form') {
    //   //     return null
    //   //   }
    //   //   return (
    //   //     <Select allowClear options={currentPerm.wxRoleOptions} key="label" />
    //   //   )
    //   // },
    // },

    // {
    //   title: '状态',
    //   key: 'status',
    //   dataIndex: 'status',
    //   valueEnum: {
    //     0: { text: '启用', status: 'Success' },
    //     1: { text: '禁用', status: 'Error' },
    //     2: { text: '待加入', status: 'warning' },
    //     3: { text: '审核中', status: 'Processing' },
    //     4: { text: '审核失败', status: 'Default' },
    //     5: { text: '待设置密码', status: 'warning' },
    //   },
    // },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '130px',
      fixed: 'right',
      // render: (_, record) =>
      //   record.superAdmin ? (
      //     [
      // <a
      //   type="link"
      //   onClick={async () => {
      //     resetPwd({ id: record.id }).then((res) => {
      //       if (res) message.success('重置密码成功');
      //     });
      //   }}
      // >
      //   {/* 修改角色 */}
      //   重置密码
      // </a>,
      //   ]
      // ) : (
      //   <></>
      // ),
    },
  ]
  return (
    <ProTable
      // params 是需要自带的参数
      // 这个参数优先级更高，会覆盖查询表单的参数
      className="bg"
      params={{ current: 1, size: 10 }}
      columns={columns}
      bordered={true}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      request={async (
        params: {
          size: number
          current: number
        },
        sort,
        filter
      ) => {
        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
        // 如果需要转化参数可以在这里进行修改
        const res: any = await fetchSysUserPageList(params)
        return {
          data: res.data.records,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: res.code === 200,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: parseInt(res.data.total),
        }
      }}
    />
  )
}
