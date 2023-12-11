'use client'

import {
  ProFormText,
  ModalForm,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormSwitch,
} from '@ant-design/pro-components'
import { insertSysMenu, updateSysMenu } from '@/services/system/menu'
import { getSysMenuInfo } from '@/services/system/menu'
import rules from '@/utils/rules'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import type { ActionType } from '@ant-design/pro-table'
type ModalModifyFormDataProps = {
  actionRef: React.MutableRefObject<ActionType>
  currentRow: any
  resetCurrentRow: () => void
  treeParentList: any
}
const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
}
const itemLayout = {
  wrapperCol: { span: 18, offset: 0 },
  labelCol: { span: 5 },
}
const ModalModifyForm: any = (props: ModalModifyFormDataProps, ref) => {
  const [openModal, setOpenModal] = useState(false)
  useImperativeHandle(ref, () => ({
    setOpenModal,
  }))
  const [showParentId, setShowParentId] = useState(false)
  const formRef = useRef<any | null>(null)
  const { actionRef, currentRow, resetCurrentRow, treeParentList } = props
  const [loading, setLoading] = useState(false)
  const handleShowParent = () => {
    setShowParentId(formRef.current?.getFieldValue('isLeaf'))
  }
  useEffect(() => {
    handleShowParent()
  }, [])
  useEffect(() => {
    if (currentRow.id) {
      // 编辑获取根据id用户信息
      getSysMenuInfo({ id: currentRow.id }).then((res: any) => {
        if (res.code === 200) {
          // 初始化数据
          formRef.current?.setFieldsValue({
            ...res.data,
          })
          handleShowParent()
        } else {
          formRef.current?.resetFields()
          formRef.current?.setFieldsValue({})
          handleShowParent()
        }
      })
    } else {
      formRef.current?.resetFields()
      formRef.current?.setFieldsValue({})
      handleShowParent()
    }
  }, [currentRow?.id])

  const onSubmitUpdate = async (values: any) => {
    setLoading(true)
    let res
    try {
      if (currentRow.id) {
        res = await updateSysMenu({ ...values, id: currentRow.id })
      } else {
        res = await insertSysMenu(values)
      }
      if (res.code === 200) {
        message.success('提交成功')
        actionRef.current?.reload()
        setOpenModal(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('提交失败')
    }
  }
  return (
    <>
      <ModalForm
        layout="horizontal"
        formRef={formRef}
        {...tailLayout}
        loading={loading}
        title={(currentRow.id ? '编辑' : '新增') + '菜单'}
        open={openModal}
        onOpenChange={setOpenModal}
        modalProps={{ maskClosable: false }}
        onFinish={async (values) => onSubmitUpdate(values)}
        width={600}
        trigger={
          <Button
            onClick={() => {
              formRef.current?.resetFields()
              setOpenModal(true)
              resetCurrentRow()
            }}
            type="primary"
            className="flex items-center"
          >
            <PlusOutlined />
            新建
          </Button>
        }
        initialValues={{
          isHidden: false,
          isLeaf: true,
          isExpand: true,
          orderNum: 10,
          parentId: 0,
        }}
      >
        <ProFormSwitch
          name="isHidden"
          label="是否隐藏"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"
        />
        <ProFormSwitch
          name="isExpand"
          label="是否展开"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"
        />
        <ProFormSwitch
          name="isLeaf"
          label="是否叶子"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"
          onChange={handleShowParent}
        />
        <ProFormTreeSelect
          {...itemLayout}
          name="parentId"
          label="父级菜单"
          rules={[rules.required]}
          hidden={showParentId}
          key="id"
          fieldProps={{
            treeData: treeParentList,
            treeDefaultExpandAll: true,
            treeIcon: false,
            treeLine: true,
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
        />

        <ProFormText
          {...itemLayout}
          name="name"
          label="菜单名称"
          rules={[rules.required]}
          placeholder="请输入菜单名称"
        />
        <ProFormText
          {...itemLayout}
          name="code"
          label="菜单编码"
          placeholder="请输入菜单编码"
          rules={[rules.required]}
        />
        <ProFormText
          {...itemLayout}
          name="icon"
          label="菜单图标"
          placeholder="请输入菜单图标"
          rules={[rules.required]}
        />
        <ProFormText
          {...itemLayout}
          name="path"
          label="菜单路径"
          placeholder="请输入菜单路径"
          rules={[rules.required]}
        />
        <ProFormDigit
          name="orderNum"
          label="显示顺序"
          {...itemLayout}
          min={0}
          max={99}
          rules={[rules.required, { type: 'number', min: 0, max: 99 }]}
        />
      </ModalForm>
    </>
  )
}
export default forwardRef(ModalModifyForm)
