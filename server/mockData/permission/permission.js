const express = require('express');

const router = express.Router();

router.post('/permission/getMenu', (req, res) => {
  const { username, password } = req.body;
  // 先判断用户是否存在
  // 判断账号和密码是否对应
  if (username === 'admin' && password === 'admin') {
    res.send({
      code: 200,
      data: {
        menu: [
          {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 'HomeFilled',
            url: 'Home/Home'
          },
          {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall/Mall'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User/User'
          },
          {
            label: '其他',
            icon: 'location',
            children: [
              {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Others/Page1'
              },
              {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Others/Page2'
              }
            ]
          }
        ],
        token: 'C282Ce5C-e7Fe-fe0B-B9C7-Cc6A72448C39',
        message: '获取成功'
      }
    })
  } else if (username === '111' && password === '111') {
    res.send({
      code: 200,
      data: {
        menu: [
          {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 'HomeFilled',
            url: 'Home/Home'
          },
          {
            path: '/video',
            name: 'video',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall/Mall'
          }
        ],
        token: 'C282Ce5C-e7Fe-fe0B-B9C7-Cc6A72448C39',
        message: '获取成功'
      }
    })
  } else {
    res.send({
      code: -999,
      data: {
        message: '密码错误'
      }
    })
  }
})


module.exports = router;