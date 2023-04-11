const express = require('express');

const router = express.Router();


router.get('/home/countdata', (req, res) => {
  res.send({
    code: 200,
    data: {
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
      ],
    }
  }
  )
})

module.exports = router;