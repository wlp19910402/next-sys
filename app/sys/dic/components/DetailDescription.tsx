'use client'

import { ProDescriptions } from '@ant-design/pro-components'
import { getSysDicInfo } from '@/services/system/dic'
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
      getSysDicInfo({ id: currentRow.id }).then((res: any) => {
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
      <ProDescriptions.Item label="ID">
        {detailCurrentRow.id}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典名称">
        {detailCurrentRow.dictName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典编码">
        {detailCurrentRow.dictCode}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典类型名称">
        {detailCurrentRow.typeName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典类型编码">
        {detailCurrentRow.typeCode}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="字典结构">
        {detailCurrentRow.dictStruct === 'tree' ? '树形结构' : '普通结构'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="父级节点ID">
        {detailCurrentRow.parentId}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="显示顺序">
        {detailCurrentRow.orderNum}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="是否叶子">
        <div
          className={`${
            !detailCurrentRow.isLeaf ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          {!detailCurrentRow.isLeaf ? '否' : '是'}
        </div>
      </ProDescriptions.Item>
      <ProDescriptions.Item label="是否展开">
        <div
          className={`${
            !detailCurrentRow.isExpand ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          {!detailCurrentRow.isExpand ? '否' : '是'}
        </div>
      </ProDescriptions.Item>
      <ProDescriptions.Item label="是否隐藏">
        <div
          className={`${
            detailCurrentRow.isHidden ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          {detailCurrentRow.isHidden ? '是' : '否'}
        </div>
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
