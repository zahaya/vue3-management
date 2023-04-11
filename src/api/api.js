import http from "../utils/request.js";



// 获取表格数据
export const getData = () => {
  return http.get('/home/homedata')
}

// 获取销量数据
export const getCountData = () => {
  return http.get('/home/countdata')
}

// 获取Echarts表格数据
export const getEchartsData = () => {
  return http.get('/home/echartsdata')
}



// 获取用户列表
export const getUser = (params) => {
  return http.get('/user/getuser', params)
}

// 添加用户
export const addUser = (data) => {
  return http.post('/user/add', data)
}

// 修改用户
export const editUser = (data) => {
  return http.post('/user/edit', data)
}

// 删除用户
export const delUser = (data) => {
  return http.post('/user/delete', data)
}


export const getMenu = (data) => {
  return http.post('/permission/getMenu', data)
}