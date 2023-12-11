'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import { fetchSysRolePageList, deleteSysRoleById } from '@/services/system/role'
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import ModalUpdateInfo from '@/app/sys/role/components/ModalUpdateInfo'
import type { ActionType } from '@ant-design/pro-table'
import DetailDescription from '@/app/sys/role/components/DetailDescription'
import { Tooltip, Divider, Button, Popconfirm, message, Drawer } from 'antd'
import { useState, useRef } from 'react'
import { Select } from 'antd'

export default function Page() {
  const columns:
    | ProColumns<
        {
          id: any
        },
        string
      >[]
    | undefined = [
    {
      title: '序号',
      dataIndex: 'index',
      hideInSearch: true,
      width: 46,
      fixed: 'left',
      align: 'center',
      rowScope: 'row',
      render: (_, row: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      hideInSearch: true,
      width: '110px',
      align: 'center',
      fixed: 'left',
      key: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      width: '120px',
      key: 'roleCode',
    },
    {
      title: '是否禁用',
      dataIndex: 'isStop',
      key: 'isStop',
      width: '74px',
      align: 'center',
      initialValue: '',
      render: (val: any) => (
        <div className={`${val ? 'text-red-500' : 'text-green-400'}`}>
          {val ? '是' : '否'}
        </div>
      ),
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            key="isStop"
            options={[
              {
                label: '全部',
                value: '',
              },
              {
                label: '是',
                value: true,
              },
              {
                label: '否',
                value: false,
              },
            ]}
          />
        )
      },
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      width: '74px',
      align: 'center',
      key: 'orderNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '150px',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: '150px',
      key: 'updateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '150px',
      fixed: 'right',
      align: 'center',
      render: (_, record: any) => (
        <>
          <Tooltip placement="topLeft" title="禁用">
            <Popconfirm
              title="确认"
              description="请确认是否禁用"
              onConfirm={() => handleDelete(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="link"
                loading={deleteLoadingId && deleteLoadingId === record.id}
                size="small"
                disabled={record.isStop}
                danger
              >
                {/* 判断是否在删除加载中 */}
                {deleteLoadingId && deleteLoadingId === record.id ? (
                  <></>
                ) : (
                  <DeleteOutlined />
                )}
              </Button>
            </Popconfirm>
          </Tooltip>
          <Divider type="vertical" />
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
          <Divider type="vertical" />
          <Tooltip placement="topLeft" title="编辑">
            <Button
              type="link"
              size="small"
              onClick={() => {
                setCurrentRow(record)
                modalUpdateRef.current?.setOpenModal(true)
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ]
  const actionRef = useRef<ActionType>()
  const [deleteLoadingId, setDeleteLoadingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDelete = (id) => {
    setDeleteLoadingId(id)
    deleteSysRoleById({ id })
      .then((res) => {
        if (res.code === 200) {
          message.success('删除成功')
          actionRef?.current?.reload()
          setDeleteLoadingId(null)
        } else {
          setDeleteLoadingId(null)
        }
      })
      .catch((err) => {
        setDeleteLoadingId(null)
        console.log(err)
        message.error('删除操作失败')
      })
  }
  const modalUpdateRef = useRef<any>(null)
  const [currentRow, setCurrentRow] = useState<any>({})
  const [detailDrawerVisable, setDetailDrawerVisable] = useState(false)
  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        bordered={true}
        rowKey="id"
        loading={loading}
        scroll={{ x: '100%' }}
        rowClassName={(record: any, index) =>
          record.isStop ? 'qm-row-delete' : ''
        }
        pagination={{
          pageSize: 10,
        }}
        toolbar={{
          title: (
            <ModalUpdateInfo
              ref={modalUpdateRef}
              resetCurrentRow={() => setCurrentRow({})}
              currentRow={currentRow}
              actionRef={actionRef}
            />
          ),
        }}
        request={async (params: {
          pageSize: number
          current: number
          roleCode?: string
          isStop: boolean | string
        }) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          setLoading(true)
          let obj = { ...params }
          if (obj.roleCode === '') {
            delete obj['roleCode']
          }
          obj.isStop === '' && delete obj['isStop']
          const res: any = await fetchSysRolePageList({
            ...obj,
            size: -1,
          })
          setLoading(false)
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
