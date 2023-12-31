'use client'

import {
  ProFormText,
  ModalForm,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormSwitch,
} from '@ant-design/pro-components'
import { insertSysDic, updateSysDic } from '@/services/system/dic'
import { getSysDicInfo } from '@/services/system/dic'
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
// import { useAppSelector } from '@/store/hooks'
import { DicTypeItemInterface } from '@/store/slice/dictype/model'
type ModalModifyFormDataProps = {
  actionRef: React.MutableRefObject<ActionType>
  currentRow: any
  resetCurrentRow: () => void
  curDictType: DicTypeItemInterface
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
  const {
    actionRef,
    currentRow,
    resetCurrentRow,
    curDictType,
    treeParentList,
  } = props
  const [loading, setLoading] = useState(false)
  const handleShowParent = () => {
    setShowParentId(
      curDictType.dictStruct !== 'tree' ||
        (curDictType.dictStruct === 'tree' &&
          formRef.current?.getFieldValue('isLeaf'))
    )
  }
  useEffect(() => {
    handleShowParent()
  }, [])
  useEffect(() => {
    if (currentRow.id) {
      // 编辑获取根据id用户信息
      getSysDicInfo({ id: currentRow.id }).then((res: any) => {
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
        res = await updateSysDic({ ...values, id: currentRow.id })
      } else {
        res = await insertSysDic(values)
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
        title={(currentRow.id ? '编辑' : '新增') + '字典'}
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
          typeCode: curDictType.value,
          typeName: curDictType.label,
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
          hidden={curDictType.dictStruct !== 'tree'}
        />
        <ProFormSwitch
          name="isLeaf"
          label="是否叶子"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"
          hidden={curDictType.dictStruct !== 'tree'}
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
              label: 'dictName',
              value: 'id',
            },
          }}
        />

        <ProFormText
          {...itemLayout}
          name="dictName"
          label="字典名称"
          rules={[rules.required]}
          placeholder="请输入字典名称"
        />
        <ProFormText
          {...itemLayout}
          name="dictCode"
          label="字典编码"
          placeholder="请输入字典编码"
          rules={[rules.required]}
          disabled={currentRow?.id}
        />
        <ProFormDigit
          name="orderNum"
          label="显示顺序"
          {...itemLayout}
          min={0}
          max={99}
          rules={[rules.required, { type: 'number', min: 0, max: 99 }]}
        />
        <ProFormText
          {...itemLayout}
          name="typeName"
          label="字典类型"
          rules={[rules.required]}
          initialValue={curDictType.label}
          disabled
        />
        <ProFormText
          {...itemLayout}
          name="typeCode"
          label="字典编码"
          rules={[rules.required]}
          initialValue={curDictType.value}
          hidden
        />
      </ModalForm>
    </>
  )
}
export default forwardRef(ModalModifyForm)
