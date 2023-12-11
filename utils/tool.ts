export const childrenFilter = (arr) => {
  return arr.map((item) => {
    if (item.children && item.children.length == 0) {
      let obj = { ...item }
      delete obj['children']
      return obj
    } else if (item.children && item.children.length > 0) {
      return { ...item, children: childrenFilter(item.children) }
    } else {
      return item
    }
  })
}

// export const treeSelectList = (arr, label, val) => {
//   return arr.map((item: any) => {
//     return {
//       title: item[label],
//       value: item[val],
//       ...(item.children && item.children.length > 0
//         ? { children: treeSelectList(item.children, label, val) }
//         : {}),
//     }
//   })
// }
