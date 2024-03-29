const express = require('express');
const router = express.Router()
const Mock = require('mockjs')

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}


/**
 * 获取列表
 * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
 * @param name, page, limit
 * @return {{code: number, count: number, data: *[]}}
 */

router.get('/user/getuser', (req, res) => {
  const { name, page = 1, limit = 20 } = req.query
  const mockList = List.filter(user => {
    if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
    return true
  })
  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
  res.send({
    code: 200,
    count: mockList.length,
    list: pageList
  })
})



/**
 * 增加用户
 * @param name, addr, age, birth, sex
 * @return {{code: number, data: {message: string}}}
 */

router.post('/user/add', (req, res) => {
  const { name, addr, age, birth, sex } = req.body
  List.unshift({
    id: Mock.Random.guid(),
    name: name,
    addr: addr,
    age: age,
    birth: birth,
    sex: sex
  })
  res.send({
    code: 200,
    data: {
      message: '添加成功'
    }
  })
},
)


/**
 * 删除用户
 * @param id
 * @return {*}
 */

router.post('/user/delete', (req, res) => {
  let { id } = req.body
  id = id.split(',')
  List = List.filter(u => !id.includes(u.id))
  res.send({
    code: 200,
    data: {
      message: '批量删除成功'
    }
  })
})


/**
 * 修改用户
 * @param id, name, addr, age, birth, sex
 * @return {{code: number, data: {message: string}}}
 */
router.post('/user/edit', (req, res) => {
  const { id, name, addr, age, birth, sex } = req.body
  const sex_num = parseInt(sex)
  List.some(u => {
    if (u.id === id) {
      u.name = name
      u.addr = addr
      u.age = age
      u.birth = birth
      u.sex = sex_num
      return true
    }
  })
  res.send({
    code: 200,
    data: {
      message: '编辑成功'
    }
  })
})


module.exports = router
