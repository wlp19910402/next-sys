'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import { fetchSysUserPageList } from '@/services/system/user'
import {
  updateRoleDelBindUser,
  updateRoleBindUser,
} from '@/services/system/role'
import { FileTextOutlined } from '@ant-design/icons'
import { Select, Space, message, Popconfirm } from 'antd'
import type { ActionType } from '@ant-design/pro-table'
import DetailDescription from '@/app/sys/user/components/DetailDescription'
import { Image, Tooltip, Button, Drawer } from 'antd'
import { useState, useRef } from 'react'

type ModalModifyFormDataProps = {
  roleId: string
  handleUserModalCancel: () => void
}
export default function Page(props: ModalModifyFormDataProps, ref) {
  const { roleId, handleUserModalCancel } = props
  const formRef = useRef<any | null>(null)
  const [isBind, setIsBind] = useState<boolean>(true)
  const columns:
    | ProColumns<
        {
          id: any
        },
        string
      >[]
    | undefined = [
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      hideInSearch: true,
      width: 80,
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
      title: '登录名称',
      dataIndex: 'loginName',
      width: '150px',
      key: 'loginName',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      width: '150px',
      hideInSearch: true,
    },

    {
      title: '联系方式',
      dataIndex: 'userPhone',
      width: '150px',
      key: 'userPhone',
      hideInSearch: true,
    },
    {
      title: '用户角色',
      dataIndex: 'roleId',
      width: 76,
      align: 'center',
      key: 'roleId',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '角色绑定',
      dataIndex: 'roleQueryType',
      width: 76,
      align: 'center',
      key: 'roleQueryType',
      hideInTable: true,
      initialValue: 'roleBind',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            allowClear
            key="roleQueryType"
            onChange={(val, obj: any) => {
              formRef.current.setFieldsValue({ roleQueryType: val })
              setIsBind(val === 'roleBind')
              setLoading(true)
              formRef.current?.submit()
            }}
            options={[
              { label: '绑定', value: 'roleBind' },
              { label: '未绑定', value: 'roleUnBind' },
            ]}
          />
        )
      },
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      width: 76,
      align: 'center',
      key: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '是否删除',
      dataIndex: 'isDelete',
      width: 80,
      align: 'center',
      key: 'isDelete',
      render: (val: any) => (
        <div className={`${val ? 'text-red-500' : 'text-green-400'}`}>
          {val ? '是' : '否'}
        </div>
      ),
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            allowClear
            key="isDelete"
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        )
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '48px',
      fixed: 'right',
      align: 'center',
      render: (_, record: any) => (
        <Tooltip placement="topLeft" title="详情">
          <Button
            type="link"
            size="small"
            onClick={() => {
              setCurrentRow(record)
              setDetailDrawerVisable(true)
            }}
          >
            <FileTextOutlined />
          </Button>
        </Tooltip>
      ),
    },
  ]
  const actionRef = useRef<ActionType>()
  const [loading, setLoading] = useState(false)
  const [currentRow, setCurrentRow] = useState<any>({})
  const [detailDrawerVisable, setDetailDrawerVisable] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>(
    []
  )
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    alwaysShowAlert: true,
    onChange: onSelectChange,
    defaultSelectedRowKeys: [],
  }

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        formRef={formRef}
        bordered={true}
        rowKey="id"
        loading={loading}
        scroll={{ x: '100%' }}
        rowSelection={rowSelection}
        rowClassName={(record: any, index) =>
          record.isDelete ? 'qm-row-delete' : ''
        }
        toolBarRender={false}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          console.log(selectedRowKeys, selectedRows)
          return selectedRowKeys.length ? (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          ) : (
            false
          )
        }}
        tableAlertOptionRender={() => {
          return (
            selectedRowKeys.length && (
              <Popconfirm
                title="确认"
                description={isBind ? '请确认是否解绑' : '请确认是否绑定'}
                onConfirm={async () => {
                  let res
                  if (isBind) {
                    res = await updateRoleDelBindUser({
                      roleId,
                      userIds: selectedRowKeys,
                    })
                  } else {
                    res = await updateRoleBindUser({
                      roleId,
                      userIds: selectedRowKeys,
                    })
                  }
                  if (res.code === 200) {
                    message.success('操作成功')
                    actionRef?.current?.reload()
                    setSelectedRowKeys([])
                    handleUserModalCancel()
                  } else {
                    message.error(res.msg)
                  }
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type="primary"
                  className="flex items-center"
                  disabled={selectedRowKeys.length == 0}
                >
                  {isBind ? '解绑' : '绑定'}
                </Button>
              </Popconfirm>
            )
          )
        }}
        pagination={{
          pageSize: 10,
        }}
        request={async (params: { pageSize: number; current: number }) => {
          setLoading(true)
          const res: any = await fetchSysUserPageList({
            ...params,
            size: params.pageSize,
            roleId,
          })
          setLoading(false)
          return {
            data: res.data.records,
            success: res.code === 200,
            total: parseInt(res.data.total),
          }
        }}
      />
      <Drawer
        title="详细信息"
        placement="left"
        width={600}
        onClose={() => setDetailDrawerVisable(false)}
        open={detailDrawerVisable}
      >
        <DetailDescription currentRow={currentRow} />
      </Drawer>
    </>
  )
}
