import request from '@/utils/request'

// 查询表
export function queryTables(params) {
  return request({
    url: '/database/tables',
    method: 'get',
    params
  })
}

// 查询表字段
export function queryFieldList(params) {
  return request({
    url: '/database/columns',
    method: 'get',
    params
  })
}

// // 查询
// export function queryTables(params) {
//   return request({
//     url: '/TableManage/list',
//     method: 'get',
//     params
//   })
// }
//
// // 新增
// export function add(params) {
//   return request({
//     url: '/TableManage/add',
//     method: 'post',
//     params
//   })
// }
//
// // 修改
// export function update(params) {
//   return request({
//     url: '/TableManage/update',
//     method: 'put',
//     params
//   })
// }
//
// // 删除
// export function remove(params) {
//   return request({
//     url: `/TableManage/delete`,
//     method: 'get',
//     params
//   })
// }
