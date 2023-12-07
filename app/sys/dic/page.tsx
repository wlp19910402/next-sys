'use client'

import { ProTable, ProColumns } from '@ant-design/pro-components'
import {
  getSysDicComboList,
  deleteSysDicById,
  getSysDicTreeList,
} from '@/services/system/dic'
import { childrenFilter } from '@/utils/tool'
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Select } from 'antd'
import ModalUpdateInfo from '@/app/sys/user/components/ModalUpdateInfo'
import type { ActionType } from '@ant-design/pro-table'
import type { ProFormInstance } from '@ant-design/pro-form'
import DetailDescription from '@/app/sys/user/components/DetailDescription'
import { Tooltip, Divider, Button, Popconfirm, message, Drawer } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { dicTypeAllThunk } from '@/store/slice/dictype'

export default function Page() {
  const dictypeList = useAppSelector((state) => state.dicType.dictypeList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (dictypeList.length === 0) {
      dispatch(dicTypeAllThunk({ size: -1, current: 1 }))
    }
  }, [])
  const [curDictStruct, setCurDictStruct] = useState(
    dictypeList.length > 0 ? dictypeList[0].dictStruct : 'combo'
  )
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
    //   hideInSearch: true,
    //   width: 46,
    //   fixed: 'left',
    //   align: 'center',
    //   rowScope: 'row',
    //   render: (_, row: any, index: number) => <span>{index + 1}</span>,
    // },
    {
      title: '字典名称(页面显示)',
      dataIndex: 'dictName',
      hideInSearch: true,
      width: '200px',
      fixed: 'left',
      key: 'dictName',
    },
    {
      title: '字典编码',
      dataIndex: 'dictCode',
      width: '150px',
      hideInSearch: true,
      key: 'dictCode',
    },
    {
      title: '字典类型',
      dataIndex: 'dictTypeCode',
      key: 'dictTypeCode',
      width: '80px',
      align: 'center',
      initialValue: dictypeList.length > 0 ? dictypeList[0].value : '',
      render: () => (curDictStruct === 'tree' ? '树形结构' : '普通结构'),
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            key="dictTypeCode"
            onChange={(val, obj: any) => {
              form.setFieldsValue({ dictTypeCode: val })
              setLoading(true)
              setCurDictStruct(obj.dictStruct)
              formRef.current?.submit()
            }}
            options={dictypeList}
          />
        )
      },
    },

    {
      title: '字典顺序',
      dataIndex: 'orderNum',
      width: '80px',
      key: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '是否叶子',
      dataIndex: 'isLeaf',
      width: 76,
      align: 'center',
      key: 'isLeaf',
      hideInSearch: true,
      render: (val: any) => (
        <div className={`${val ? 'text-gary-500' : 'text-green-400'}`}>
          {!val ? '否' : '是'}
        </div>
      ),
    },
    {
      title: '是否展开',
      dataIndex: 'isExpand',
      width: 76,
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
      width: 76,
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
  const formRef = useRef<ProFormInstance>()
  // MutableRefObject<ProFormInstance>
  const [deleteLoadingId, setDeleteLoadingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDelete = (id) => {
    setDeleteLoadingId(id)
    deleteSysDicById({ id })
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
          request={async (params: { dictTypeCode: string }) => {
            setLoading(true)
            let res: any
            if (curDictStruct == 'combo') {
              res = await getSysDicComboList({
                ...params,
              })
            } else {
              res = await getSysDicTreeList({
                ...params,
              })
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
