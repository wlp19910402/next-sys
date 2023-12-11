'use client'

import {
  ProFormText,
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
} from '@ant-design/pro-components'
import { insertSysRole, updateSysRole } from '@/services/system/role'
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
  const formRef = useRef<any | null>(null)
  const { actionRef, currentRow, resetCurrentRow } = props
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (currentRow.id) {
      // 编辑获取根据id用户信息
      formRef.current?.setFieldsValue({
        ...currentRow,
      })
    } else {
      formRef.current?.resetFields()
    }
  }, [currentRow?.id])
  const onSubmitUpdate = async (values: any) => {
    setLoading(true)
    let res
    try {
      if (currentRow.id) {
        res = await updateSysRole({ ...values, id: currentRow.id })
      } else {
        res = await insertSysRole(values)
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
        title={(currentRow.id ? '编辑' : '新增') + '角色'}
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
          isStop: false,
          orderNum: 10,
        }}
      >
        <ProFormText
          {...itemLayout}
          name="roleName"
          label="角色名称"
          rules={[rules.required]}
        />
        <ProFormText
          name="roleCode"
          {...itemLayout}
          label="角色编码"
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
        <ProFormSwitch
          name="isStop"
          label="是否禁用"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"
        />
      </ModalForm>
    </>
  )
}
export default forwardRef(ModalModifyForm)
