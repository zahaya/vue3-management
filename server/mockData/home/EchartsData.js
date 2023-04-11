const express = require('express');

const router = express.Router();



router.get('/home/echartsdata', (req, res) => {
  res.send({
    code: 200,
    data: {
      // 饼状图
      videoData: [
        {
          name: '小米',
          value: 2999
        },
        {
          name: '苹果',
          value: 5999
        },
        {
          name: 'vivo',
          value: 1500
        },
        {
          name: 'oppo',
          value: 1999
        },
        {
          name: '魅族',
          value: 2200
        },
        {
          name: '三星',
          value: 4500
        }
      ],
      // 柱状图
      userData: [
        {
          date: '周一',
          new: 5,
          active: 200
        },
        {
          date: '周二',
          new: 10,
          active: 500
        },
        {
          date: '周三',
          new: 12,
          active: 550
        },
        {
          date: '周四',
          new: 60,
          active: 800
        },
        {
          date: '周五',
          new: 65,
          active: 550
        },
        {
          date: '周六',
          new: 53,
          active: 770
        },
        {
          date: '周日',
          new: 33,
          active: 170
        }
      ],
      // 折线图
      orderData: {
        date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
        data: [{
          oppo: 892,
          vivo: 7086,
          三星: 6643,
          小米: 7929,
          苹果: 4825,
          魅族: 5131,
        },
        {
          oppo: 5346,
          vivo: 3423,
          三星: 7673,
          小米: 1236,
          苹果: 8767,
          魅族: 2346,
        },
        {
          oppo: 8456,
          vivo: 1365,
          三星: 556,
          小米: 2347,
          苹果: 3465,
          魅族: 234,
        },
        {
          oppo: 6578,
          vivo: 7086,
          三星: 6573,
          小米: 5642,
          苹果: 5457,
          魅族: 2346,
        },
        {
          oppo: 892,
          vivo: 1234,
          三星: 7643,
          小米: 7929,
          苹果: 2346,
          魅族: 4727,
        },
        {
          oppo: 3423,
          vivo: 6575,
          三星: 6643,
          小米: 6533,
          苹果: 4234,
          魅族: 5131,
        },
        {
          oppo: 4572,
          vivo: 6537,
          三星: 3465,
          小米: 1346,
          苹果: 4513,
          魅族: 5134,
        }]
      },
    }
  }
  )
})

module.exports = router;