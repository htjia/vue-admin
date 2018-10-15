import request from '@/utils/request'

// 查询
export function tokenList(params) {
  return request({
    url: '/ApiToken/list',
    method: 'get',
    params
  })
}

// 新增
export function add(params) {
  return request({
    url: '/ApiToken/add',
    method: 'post',
    params
  })
}

// 删除
export function remove(params) {
  return request({
    url: '/ApiToken/apiToken/delete',
    method: 'delete',
    params
  })
}

// 修改
export function update(params) {
  return request({
    url: '/ApiToken/apiToken/update',
    method: 'put',
    params
  })
}
