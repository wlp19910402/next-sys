'use client'

import {
  ProFormText,
  ModalForm,
  ProFormDigit,
  ProFormCheckbox,
  ProFormSwitch,
} from '@ant-design/pro-components'
import {
  insertSysUser,
  updateSysUser,
  getSysUserInfo,
} from '@/services/system/user'
import rules from '@/utils/rules'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Switch, message } from 'antd'
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import type { ActionType } from '@ant-design/pro-table'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { roleAllThunk } from '@/store/slice/role'

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
  const roleList = useAppSelector((state) => state.role.roleList)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [isUpdatePwd, setIsUpdatePwd] = useState(false)
  useEffect(() => {
    if (roleList.length === 0) {
      dispatch(roleAllThunk({ size: -1, current: 1 }))
    }
  }, [])
  useEffect(() => {
    if (currentRow.id) {
      setIsUpdatePwd(false)
      // 编辑获取根据id用户信息
      getSysUserInfo({ id: currentRow.id }).then((res: any) => {
        if (res.code === 200) {
          // 初始化数据
          formRef.current?.setFieldsValue({
            roleIdList: res.data.roleList.map((item) => item.id),
            isDelete: currentRow.isDelete ? currentRow.isDelete : false,
            ...res.data,
            password: '',
            isUpdatePwd: false,
          })
        } else {
          formRef.current?.resetFields()
          formRef.current?.setFieldsValue({
            roleIdList: [],
            isUpdatePwd: false,
          })
        }
      })
    } else {
      setIsUpdatePwd(false)
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
        res = await updateSysUser({ ...obj, id: currentRow.id })
      } else {
        res = await insertSysUser(obj)
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
        title={(currentRow.id ? '编辑' : '新增') + '用户'}
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
          isDelete: false,
          isUpdatePwd: false,
          orderNum: 10,
        }}
      >
        <ProFormText
          {...itemLayout}
          name="avatarUrl"
          label="头像"
          placeholder="请输入名称"
        />
        <ProFormText
          {...itemLayout}
          name="loginName"
          label="登录名称"
          placeholder="请输入登录名称"
          rules={[rules.required]}
          disabled={currentRow?.id}
        />

        {currentRow.id && (
          <ProFormSwitch
            name="isUpdatePwd"
            label="是否修改密码"
            {...itemLayout}
            rules={[rules.required]}
            checkedChildren="是"
            unCheckedChildren="否"
            onChange={(val: boolean) => {
              setIsUpdatePwd(val)
            }}
          />
        )}

        {(isUpdatePwd || !currentRow.id) && (
          <>
            <ProFormText.Password
              {...itemLayout}
              name="password"
              label="登录密码"
              tooltip="最长为 24 位"
              rules={[rules.required]}
            />
            <ProFormText.Password
              {...itemLayout}
              name="confirmPassword"
              label="确认密码"
              rules={[
                {
                  required: true,
                  message: '必填项',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('您输入的新密码不匹配!'))
                  },
                }),
              ]}
            />
          </>
        )}
        <ProFormText
          {...itemLayout}
          name="userName"
          label="用户名"
          rules={[rules.required]}
        />
        <ProFormText
          name="userPhone"
          {...itemLayout}
          label="联系方式"
          rules={[rules.required, rules.mobile]}
        />
        <ProFormDigit
          name="orderNum"
          label="显示顺序"
          {...itemLayout}
          min={0}
          max={99}
          rules={[rules.required, { type: 'number', min: 0, max: 99 }]}
        />
        <ProFormCheckbox.Group
          name="roleIdList"
          label="用户角色"
          {...itemLayout}
          rules={[rules.required]}
          layout="horizontal"
          options={roleList}
        />

        <ProFormSwitch
          name="isDelete"
          label="是否删除"
          tooltip="删除是指逻辑删除哦~"
          {...itemLayout}
          rules={[rules.required]}
          checkedChildren="是"
          unCheckedChildren="否"

          //   defaultChecked={false}
        />
      </ModalForm>
    </>
  )
}
export default forwardRef(ModalModifyForm)
