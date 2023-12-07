'use client'
import { ProDescriptions } from '@ant-design/pro-components'
import { useState, useEffect, forwardRef } from 'react'
type ModalModifyFormDataProps = {
  currentRow: any
}

const ModalModifyForm: any = (props: ModalModifyFormDataProps, ref) => {
  const { currentRow } = props
  const [detailCurrentRow, setDetailCurrentRow] = useState({ ...currentRow })

  useEffect(() => {
    if (currentRow?.id) {
      setDetailCurrentRow({ ...currentRow })
    } else {
      setDetailCurrentRow({})
    }
  }, [currentRow?.id])

  return (
    <ProDescriptions size="small" column={1} bordered>
      <ProDescriptions.Item label="ID">
        {detailCurrentRow?.id}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典类型名称">
        {detailCurrentRow?.typeName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典类型编码">
        {detailCurrentRow?.typeCode}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典结构">
        {detailCurrentRow?.dictStruct === 'tree' ? '树形结构' : '普通结构'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="显示顺序">
        {detailCurrentRow?.orderNum}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间">
        {detailCurrentRow?.createTime}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="更新时间">
        {detailCurrentRow?.updateTime}
      </ProDescriptions.Item>
    </ProDescriptions>
  )
}
export default forwardRef(ModalModifyForm)
