const express = require('express');
const app = express();

const getHomeData = require('./mockData/home/homeData')
const getCountData = require('./mockData/home/countData')
const getEchartsData = require('./mockData/home/EchartsData')
const getMenu = require('./mockData/permission/permission')
const UserData = require('./mockData/user/UserData')



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X-Requested-With, yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

// 解析
const bodyParser = require('body-parser')
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// 解析 application/json
app.use(bodyParser.json());


app.use('/api', getHomeData)
app.use('/api', getCountData)
app.use('/api', getEchartsData)

app.use('/api', getMenu)

app.use('/api', UserData)





app.listen(8081, () => {
  console.log(' listening on http://localhost:8081/api');
});