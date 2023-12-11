'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import { getSysMenuTreeList, deleteSysMenuById } from '@/services/system/menu'
import { childrenFilter } from '@/utils/tool'
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import ModalUpdateInfo from '@/app/sys/menu/components/ModalUpdateInfo'
import type { ActionType } from '@ant-design/pro-table'
import type { ProFormInstance } from '@ant-design/pro-form'
import DetailDescription from '@/app/sys/menu/components/DetailDescription'
import { Tooltip, Divider, Button, Popconfirm, message, Drawer } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { dicTypeAllThunk } from '@/store/slice/dictype'
export default function Page() {
  const dictypeList: any = useAppSelector((state) => state.dicType.dictypeList)
  const dispatch = useAppDispatch()
  const [treeParentList, setTreeParentList] = useState([])
  useEffect(() => {
    if (dictypeList.length === 0) {
      dispatch(dicTypeAllThunk({ size: -1, current: 1 }))
    }
  }, [])
  useEffect(() => {
    if (dictypeList.length > 0) {
    }
  }, [dictypeList.length])
  const columns:
    | ProColumns<
        {
          id: any
        },
        string
      >[]
    | undefined = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      hideInSearch: true,
      width: '140px',
      fixed: 'left',
      key: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: '90px',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '菜单编码',
      dataIndex: 'code',
      key: 'code',
      width: '140px',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '路径',
      dataIndex: 'path',
      width: '140px',
      key: 'path',
      hideInSearch: true,
    },
    {
      title: '菜单顺序',
      dataIndex: 'orderNum',
      width: 74,
      align: 'center',
      key: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '是否叶子',
      dataIndex: 'isLeaf',
      width: 74,
      align: 'center',
      key: 'isLeaf',
      hideInSearch: true,
      hideInTable: true,
      render: (val: any) => (
        <div className={`${val ? 'text-gary-500' : 'text-green-400'}`}>
          {!val ? '否' : '是'}
        </div>
      ),
    },
    {
      title: '是否展开',
      dataIndex: 'isExpand',
      width: 74,
      align: 'center',
      key: 'isExpand',
      hideInSearch: true,
      render: (val: any) => (
        <div className={`${val ? 'text-gary-500' : 'text-green-400'}`}>
          {!val ? '否' : '是'}
        </div>
      ),
    },
    {
      title: '是否隐藏',
      dataIndex: 'isHidden',
      width: 74,
      align: 'center',
      key: 'isHidden',
      hideInSearch: true,
      render: (val: any) => (
        <div className={`${val ? 'text-gary-500' : 'text-green-400'}`}>
          {!val ? '否' : '是'}
        </div>
      ),
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
          <Tooltip placement="topLeft" title="详情">
            <Button
              type="link"
              size="small"
              onClick={() => {
                setCurrentRow({
                  ...record,
                })
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
  const formRef = useRef<ProFormInstance>()
  const [deleteLoadingId, setDeleteLoadingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDelete = (id) => {
    setDeleteLoadingId(id)
    deleteSysMenuById({ id })
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
      {dictypeList.length && (
        <ProTable
          formRef={formRef}
          actionRef={actionRef}
          columns={columns}
          bordered={true}
          rowKey="id"
          loading={loading}
          scroll={{ x: '100%' }}
          rowClassName={(record: any, index) =>
            record.isDelete ? 'qm-row-delete' : ''
          }
          pagination={false}
          search={false}
          toolbar={{
            title: (
              <ModalUpdateInfo
                ref={modalUpdateRef}
                resetCurrentRow={() => setCurrentRow({})}
                currentRow={currentRow}
                actionRef={actionRef}
                treeParentList={treeParentList}
              />
            ),
          }}
          request={async (params: any) => {
            setLoading(true)
            let res: any

            res = await getSysMenuTreeList({
              ...params,
            })

            if (res.code === 200) {
              setTreeParentList(childrenFilter(res.data))
            }
            setLoading(false)
            return {
              data: childrenFilter(res.data),
              success: res.code === 200,
            }
          }}
        />
      )}
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
