'use client'

import { ProDescriptions } from '@ant-design/pro-components'
import { getSysRoleInfo } from '@/services/system/role'
import { useState, useEffect, forwardRef } from 'react'
type ModalModifyFormDataProps = {
  currentRow: any
}
const ModalModifyForm: any = (props: ModalModifyFormDataProps, ref) => {
  const { currentRow } = props
  const [loading, setLoading] = useState(false)
  const [detailCurrentRow, setDetailCurrentRow] = useState({ ...currentRow })
  useEffect(() => {
    setLoading(true)
    if (currentRow.id) {
      // 编辑获取根据id用户信息
      getSysRoleInfo({ id: currentRow.id }).then((res: any) => {
        if (res.code === 200) {
          setDetailCurrentRow({ ...currentRow, ...res.data })
        } else {
          setDetailCurrentRow({ ...currentRow })
        }
        setLoading(false)
      })
    } else {
      setDetailCurrentRow({ ...currentRow })
      setLoading(false)
    }
  }, [currentRow?.id])

  return (
    <ProDescriptions size="small" column={1} loading={loading} bordered>
      <ProDescriptions.Item label="角色名称">
        {detailCurrentRow.roleName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="角色编码">
        {detailCurrentRow.roleCode}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="是否禁用">
        {detailCurrentRow.isStop ? '是' : '否'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="显示顺序">
        {detailCurrentRow.orderNum}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间">
        {detailCurrentRow.createTime}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="更新时间">
        {detailCurrentRow.updateTime}
      </ProDescriptions.Item>
    </ProDescriptions>
  )
}
export default forwardRef(ModalModifyForm)
