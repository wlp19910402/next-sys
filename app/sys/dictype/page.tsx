'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import { deleteSysUserById } from '@/services/system/user'
import {
  fetchSysDicTypePageList,
  deleteSysDicTypeById,
} from '@/services/system/dicType'
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import ModalUpdateInfo from '@/app/sys/dictype/components/ModalUpdateInfo'
import type { ActionType } from '@ant-design/pro-table'
import DetailDescription from '@/app/sys/dictype/components/DetailDescription'
import { Tooltip, Divider, Button, Popconfirm, message, Drawer } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { roleAllThunk } from '@/store/slice/role'

export default function Page() {
  const roleList = useAppSelector((state) => state.role.roleList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (roleList.length === 0) {
      dispatch(roleAllThunk({ size: -1, current: 1 }))
    }
  }, [])
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
      title: '字典类型名称',
      dataIndex: 'typeName',
      hideInSearch: true,
      width: '150px',
      fixed: 'left',
      key: 'typeName',
    },
    {
      title: '字典类型编码',
      dataIndex: 'typeCode',
      width: '150px',
      key: 'typeCode',
      hideInSearch: true,
    },
    {
      title: '字典结构',
      dataIndex: 'dictStruct',
      width: '80px',
      align: 'center',
      key: 'dictStruct',
      hideInSearch: true,
      valueEnum: {
        tree: { text: '树形结构', status: 'tree' },
        combo: { text: '普通结构', status: 'combo' },
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
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      align: 'center',
      hideInSearch: true,
      key: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      width: 180,
      hideInSearch: true,
      align: 'center',
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
          <Tooltip placement="topLeft" title="删除">
            <Popconfirm
              title="确认"
              description="请确认是否删除"
              onConfirm={() => handleDelete(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="link"
                loading={deleteLoadingId && deleteLoadingId === record.id}
                size="small"
                disabled={record.isDelete}
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
          <Tooltip placement="topLeft" title="详情2">
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
    deleteSysDicTypeById({ id })
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
        search={false}
        actionRef={actionRef}
        columns={columns}
        bordered={true}
        rowKey="id"
        loading={loading}
        scroll={{ x: '100%' }}
        rowClassName={(record: any, index) =>
          record.isDelete ? 'qm-row-delete' : ''
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
        request={async (params: { pageSize: number; current: number }) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          setLoading(true)
          const res: any = await fetchSysDicTypePageList({
            ...params,
            size: params.pageSize,
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
