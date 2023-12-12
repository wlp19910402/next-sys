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
import {
  updateRoleDelBindMenu,
  updateRoleBindMenu,
} from '@/services/system/role'
import DetailDescription from '@/app/sys/menu/components/DetailDescription'
import {
  Tooltip,
  Divider,
  Button,
  Popconfirm,
  message,
  Drawer,
  Space,
} from 'antd'
import { useState, useRef } from 'react'
type ModalModifyFormDataProps = {
  roleId: string
  handleModalCancel: () => void
}
export default function Page(props: ModalModifyFormDataProps, ref) {
  const { roleId, handleModalCancel } = props
  const [treeParentList, setTreeParentList] = useState([])
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
      width: '48px',
      fixed: 'right',
      align: 'center',
      render: (_, record: any) => (
        <>
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
  const [initSelectArrIds, setInitSelectArrIds] = useState([])
  const toggleRowArr = (arr: any) => {
    let obj = []
    arr.forEach((item: any) => {
      if (item.isBindRole) {
        obj.push(item.id)
      }
      if (item.children && item.children.length > 0) {
        obj = obj.concat(toggleRowArr(item.children))
      }
    })
    return obj
  }
  const handleRequest = async (params: any) => {
    setLoading(true)
    let res: any
    res = await getSysMenuTreeList({
      ...params,
      roleId,
    })

    if (res.code === 200) {
      let arr = toggleRowArr(res.data)
      setInitSelectArrIds(arr)
      setSelectedRowKeys(arr)
      setTreeParentList(childrenFilter(res.data))
    }
    setLoading(false)
    return {
      data: childrenFilter(res.data),
      success: res.code === 200,
    }
  }
  return (
    <>
      <ProTable
        formRef={formRef}
        actionRef={actionRef}
        columns={columns}
        bordered={true}
        rowKey="id"
        loading={loading}
        scroll={{ x: '100%', y: '60vh' }}
        rowClassName={(record: any, index) =>
          record.isDelete ? 'qm-row-delete' : ''
        }
        rowSelection={rowSelection}
        pagination={false}
        search={false}
        toolBarRender={false}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
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
            <Popconfirm
              title="确认"
              description="请确认保存当前内容"
              onConfirm={async () => {
                let res1: any, res2: any
                let addMenus: any = []
                let temp = [...initSelectArrIds]
                selectedRowKeys.forEach((item: any) => {
                  let idx = temp.indexOf(item)
                  if (idx === -1) {
                    addMenus.push(item)
                  } else {
                    temp.splice(idx, 1)
                  }
                })
                try {
                  if (temp.length > 0) {
                    res1 = await updateRoleDelBindMenu({
                      roleId: props.roleId,
                      menuIds: temp,
                    })
                  }
                  if (addMenus.length > 0) {
                    res2 = await updateRoleBindMenu({
                      roleId: props.roleId,
                      menuIds: addMenus,
                    })
                  }
                  if (res1?.code === 200 && res2?.code === 200) {
                    message.success(res1.msg)
                    // actionRef?.current?.reload()
                    handleModalCancel()
                  } else if (res1?.code === 200) {
                    message.success('删除角色绑定菜单成功')
                    // actionRef?.current?.reload()
                    handleModalCancel()
                  } else if (res2?.code === 200) {
                    message.success('角色绑定菜单成功')
                    // actionRef?.current?.reload()
                    handleModalCancel()
                  } else {
                    message.error(res1.msg, res2.msg)
                  }
                } catch (err) {
                  console.log(err)
                  message.error('保存失败')
                }
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" className="flex items-center">
                保存
              </Button>
            </Popconfirm>
          )
        }}
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
        request={handleRequest}
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
