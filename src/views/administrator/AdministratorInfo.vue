<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from 'vue';
import {
  getData1Service,
  getData2Service,
  getData3Service,
  getData4Service,
  getData5Service, getData6Service,
  getDateService
} from '@/api/data';

// 初始配置
const option = {
  title: {
    text: '七日内新增统计'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['新增用户', '新增帖子', '新增计划']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
};
const option1= {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
        left: 'center'
  },
  series: [
    {
      name: '各社区帖子数量统计 ',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
};
const option2 = {
  title: {
    text: '七日内AI定制次数统计'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
};
const usercount=ref(0);
const postcount=ref(0);
const schedulecount=ref(0);
const pic1=ref( "https://bigzhouzhou.oss-cn-beijing.aliyuncs.com/%E5%B8%96%E5%AD%90.png");
const pic2=ref("https://bigzhouzhou.oss-cn-beijing.aliyuncs.com/%E7%94%A8%E6%88%B7.png")
const pic3=ref("https://bigzhouzhou.oss-cn-beijing.aliyuncs.com/%E7%A4%BE%E5%8C%BA.png")
onMounted(async () => {
  const chartDom = document.getElementById('line');
  const myChart = echarts.init(chartDom);
  const chartDom1=document.getElementById('pic');
  const myChart1 = echarts.init(chartDom1);
  const chartDom2=document.getElementById('zhou')
  const myChart2 = echarts.init(chartDom2);

  try {
    // 获取数据
    const result = await getData1Service();
    const result1 = await getDateService();
    const result2 = await getData2Service();
    const result3 = await getData3Service();
    const result4 = await getData4Service();
    const result5 = await getData5Service();
    const result6 = await getData6Service();

    // 更新图表配置
    option.xAxis.data = result1.data.map(item => item.day);
    option.series = result.data.map(item => ({
      name: item.name,
      type: 'line',
      stack: 'Total',
      data: item.data
    }));
    option1.series[0].data = result2.data.map(item =>({
      value: item.value,
      name: item.name
    }));
    usercount.value=result3.data;
    postcount.value=result4.data;
    schedulecount.value=result5.data;
    option2.xAxis.data=result1.data.map(item => item.day);
    option2.series[0].data = result6.data.map(item => item.count);

    // 更新图表
    myChart.setOption(option);
    myChart1.setOption(option1);
    myChart2.setOption(option2)
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>
<template>
  <div >
    <el-row :gutter="5" style="background-color: white;display: flex;justify-content: center;align-items: center;">
      <el-col :span="4">
        <el-card shadow="hover" style="position: relative; top: 18%; ">
          <h1 style="text-align: center;"> 用户数量</h1> 
          <el-avatar :size="150" :src= pic2  style="margin-left: 20px;"/>
          <h1 style="font-size: 30px; text-align: center;">{{usercount}}</h1>
        </el-card>
      </el-col>
      <el-col :span="4" >
        <el-card shadow="hover" style="position: relative; top: 18%;">
          <h1 style="text-align: center;"> 社区帖子数量</h1>
          <el-avatar :size="150" :src=pic3  style="margin-left: 20px;"/>
          <h1 style="font-size: 30px; text-align: center;">{{postcount}}</h1>
        </el-card>
      </el-col>
      <el-col :span="4" >
        <el-card shadow="hover" style="position: relative; top: 18%;">
          <h1 style="text-align: center;"> 计划数量</h1>
          <el-avatar :size="150" :src=pic1  style="margin-left: 20px;"/>
          <h1 style="font-size: 30px; text-align: center;">{{schedulecount}}</h1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="width: 100%; height: 400px" id="line">

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="5" style="margin: 10px 0">
      <el-col :span="12">
        <el-card>
          <div style="width: 100%; height: 400px" id="pic">

          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="width: 100%; height: 400px" id="zhou">

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<style scoped>


</style>