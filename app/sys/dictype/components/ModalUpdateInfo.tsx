'use client'

import {
  ProFormText,
  ModalForm,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components'
import { insertSysDicType, updateSysDicType } from '@/services/system/dicType'
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
      formRef.current?.setFieldsValue({ ...currentRow })
    } else {
      formRef.current?.resetFields()
      formRef.current?.setFieldsValue({
        roleIdList: [],
        isUpdatePwd: false,
      })
    }
  }, [currentRow?.id])
  const onSubmitUpdate = async (values: any) => {
    setLoading(true)
    let obj = { ...values }
    obj.avatarUrl === '' && delete obj['avatarUrl']
    let res
    try {
      if (currentRow.id) {
        !obj.isUpdatePwd && delete obj['password']
        res = await updateSysDicType({ ...obj, id: currentRow.id })
      } else {
        res = await insertSysDicType(obj)
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
        title={(currentRow.id ? '编辑' : '新增') + '字典类型'}
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
          orderNum: 10,
        }}
      >
        <ProFormText
          {...itemLayout}
          name="typeCode"
          label="字典类型编码"
          rules={[rules.required]}
          placeholder="请输入字典类型编码"
          disabled={currentRow?.id}
        />
        <ProFormText
          {...itemLayout}
          name="typeName"
          label="字典类型名称"
          placeholder="请输入字典类型名称"
          rules={[rules.required]}
        />

        <ProFormSelect
          {...itemLayout}
          name="dictStruct"
          label="字典结构"
          rules={[rules.required]}
          options={[
            { label: '树形结构', value: 'tree' },
            { label: '普通结构', value: 'combo' },
          ]}
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
