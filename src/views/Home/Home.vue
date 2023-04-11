<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/head.jpg" alt="" />
          <div class="user-info">
            <p class="username">admin</p>
            <p class="ruler">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-12-8</span></p>
          <p>上次登录地点: <span>安徽</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px; height: 450px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name" shadow="hover">
          <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
          <div class="details">
            <p class="details-num">¥ {{ item.value }}</p>
            <p class="details-txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px" shadow="hover">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px" shadow="hover">
          <div style="height: 260px" ref="userechart"></div>
        </el-card>
        <el-card style="height: 260px" shadow="hover">
          <div style="height: 260px" ref="videoechart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";
import { getData, getCountData, getEchartsData } from "../../api/api";
import * as echarts from "echarts";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    // 表格数据
    let tableData = ref([]);
    let countData = ref([]);
    // 表格标题
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    // echarts 表格渲染
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    // 饼状图
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    // 饼状图数据
    let videoData = reactive({
      series: [],
    });
    // 折线图
    let orderData = reactive({
      xData: [],
      series: [],
    });
    // 柱状图
    let userData = reactive({
      xData: [],
      series: [],
    });

    // 获取tableData mock数据
    const getTableList = () => {
      // await axios.get("/home/getData").then(({ data: res }) => {
      //   if (res.code === 200) {
      //     tableData.value = res.data.tableData;
      //   }
      // });
      getData().then(({ data: res }) => {
        if (res.code === 200) {
          tableData.value = res.data.tableData;
        }
      });
    };

    // 销量获取
    const getCount = () => {
      getCountData().then(({ data: res }) => {
        if (res.code === 200) {
          countData.value = res.data.countData;
        }
      });
    };

    // echarts 表格获取
    const getEcharts = () => {
      getEchartsData().then(({ data: result }) => {
        let res = result.data.orderData;
        let userRes = result.data.userData;
        let videoRes = result.data.videoData;
        orderData.xData = res.date;
        const series = [];
        // 遍历orderData数组 拿到每个对象的key 再用拿到的key循环orderData数组 得到的值添加到series中
        const keyArray = Object.keys(res.data[0]).forEach((key) => {
          series.push({
            name: key,
            data: res.data.map((item) => item[key]),
            type: "line",
          });
        });
        orderData.series = series;
        xOptions.xAxis.data = orderData.xData;
        xOptions.series = orderData.series;
        // userData 折线图进行渲染
        let hEcharts = echarts.init(proxy.$refs["echart"]);
        hEcharts.setOption(xOptions);

        // 柱状图渲染
        userData.xData = userRes.map((item) => item.date);
        userData.series = [
          {
            name: "新增用户",
            data: userRes.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userRes.map((item) => item.active),
            type: "bar",
          },
        ];
        xOptions.xAxis.data = userData.xData;
        xOptions.series = userData.series;
        let uEcharts = echarts.init(proxy.$refs["userechart"]);
        uEcharts.setOption(xOptions);

        // 饼状图
        (videoData.series = [
          {
            data: videoRes,
            type: "pie",
          },
        ]),
          (pieOptions.series = videoData.series);
        let vEcharts = echarts.init(proxy.$refs["videoechart"]);
        vEcharts.setOption(pieOptions);
      });
    };

    onMounted(() => {
      getTableList();
      getCount();
      getEcharts();
    });

    return {
      tableData,
      tableLabel,
      countData,
      xOptions,
      pieOptions,
      orderData,
      videoData,
      userData,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50px;
      margin-right: 40px;
    }

    .user-info {
      .username {
        margin-bottom: 10px;
        font-size: 26px;
      }

      .ruler {
        color: #999;
      }
    }
  }

  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;

      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }

  .num {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-card {
      width: 33%;
      margin-bottom: 20px;

      .icons {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;
      }

      .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;

        .details-num {
          font-size: 30px;
          margin-bottom: 10px;
          height: 30px;
          line-height: 30px;
        }

        .details-txt {
          font-size: 14px;
          text-align: center;
          color: gray;
        }
      }
    }
  }

  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .el-card {
      width: 48%;
    }
  }
}
</style>