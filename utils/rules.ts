const rules = {
  mobile: {
    pattern: /^((0\d{2,3}-\d{7,8})|(1[23456789]\d{9}))$/,
    min: 11,
    max: 11,
    message: '手机号格式错误',
  },
  required: { required: true, message: '必填项' },
}
export default rules
