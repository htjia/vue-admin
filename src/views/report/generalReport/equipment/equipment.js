import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { overview, downReson, rejectTrend } from '@/api/report/equipment'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      detailEquipmentVisible: false,
      activeTime: '0',
      downResonList: [],
      equipmentList: [],
      equipmentDetailList: [],
      abnormalOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          // itemGap: 40, // 设置间距
          orient: 'vertical',
          x: '60%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: []
        },
        series: [
          {
            name: '异常停机分析',
            cursor: 'default',
            minAngle: 2, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#fff'
              }
            },
            radius: ['0%', '55%'],
            label: {
              normal: {
                show: true,
                // position: 'center'
                textStyle: {
                  fontWeight: 700,
                  fontSize: 13 // 文字的字体大小
                },
                formatter: '{d}%'

              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [],
            center: ['28%', '50%']
          }
        ]
      },
      equipmentOptions: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 35
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              margin: 22,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        dataZoom: [
          {
            start: 0, // 默认为0
            end: 60,
            type: 'slider', // slider 表示有滑动块的，inside表示内置的
            show: true, // 如果为false 则不显示
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 12, // 组件高度
            left: 40, // 左边的距离
            right: 5, // 右边的距离
            bottom: 15, // 右边的距离
            fillerColor: '#d3d3d3', // 选中范围的填充颜色。
            backgroundColor: '#f9f9f9', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            filterMode: 'filter'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment250Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment350Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment500Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment650Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment800Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      equipment900Options: {
        color: ['#009494'],
        tooltip: {
          formatter: '{b} <br/>{a}: {c}%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 20
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              // margin: 15,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            name: '报废率',
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '报废率',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          }
        ]
      },
      timeRange: '',
      beginTime: '',
      endTime: '',
      currentClickPie: '',
      eqptTotalNum: '',
      maxRejectEqptDaum: '', // 报废率最高累计加工总数
      maxRejectEqptRejectRate: '', // 报废率最高报废率
      maxdownFaultReason: '', // 停机最高频原因
      maxdownEqptCode: '', // 异常停机最多的设备
      maxdownFaultReasonCloseNum: '', // 停机最高频原因的停机次数
      maxdownFaultReasonCloseTimeTotal: '', // 停机最高频原因的停机时长
      maxdownEqptCloseNum: '', // 停机次数最多的设备的停机次数
      maxdownEqptCloseTimeTotal: '', // 停机次数最多的设备的停机时长
      eqptBrands: '',
      closeNum: '', // 异常停机总次数
      maxRejectEqptCode: '', // 报废率最高机台编号
      minRejectEqptCode: '', // 报废率最低机台编号
      minRejectEqptDanum: '', // 报废率最低机台加工总数
      minRejectEqptRejectRate: '', // 报废率最低机台报废率
      closeTimeTotal: '', // 异常停机总时长(分钟)
      sortType: 1,
      sortType500: 1,
      sortType250: 1,
      sortType900: 1,
      sortType650: 1,
      sortType800: 1,
      sortType350: 1
    }
  },
  watch: {
  },
  created() {
    if (this.$route.query.tm) {
      this.activeTime = this.$route.query.tm
    }
    console.log(this.activeTime)
    this.overviewFun()
    this.downResonFun()
    this.rejectTrendFun()
  },
  mounted() {
  },
  methods: {
    formatNum(str) {
      var newStr = ''
      var count = 0
      // if (str.indexOf('.') === -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
          newStr = str.charAt(i) + ',' + newStr
        } else {
          newStr = str.charAt(i) + newStr
        }
        count++
      }
      str = newStr
      // }
      // else
      // {
      //   for(var i = str.indexOf(".")-1;i>=0;i--){
      //     if(count % 3 == 0 && count != 0){
      //       newStr = str.charAt(i) + "," + newStr;
      //     }else{
      //       newStr = str.charAt(i) + newStr; //逐个字符相接起来
      //     }
      //     count++;
      //   }
      //   str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
      // }
      return str
    },
    // 设备信息总览
    overviewFun() {
      const params = {
        timeFame: this.activeTime
      }
      overview(params).then(res => {
        this.eqptTotalNum = res.data.eqptInfo.eqptTotalNum
        this.eqptBrands = res.data.eqptInfo.eqptBrands
        this.maxRejectEqptCode = res.data.maxRejectEqptCode
        this.timeRange = res.data.timeFame
        this.maxdownEqptCode = res.data.maxdownEqptCode
        this.beginTime = res.data.beginTime
        this.endTime = res.data.endTime
        this.maxdownFaultReason = res.data.maxdownFaultReason
        this.minRejectEqptCode = res.data.minRejectEqptCode
        this.maxRejectEqptRejectRate = res.data.maxRejectEqptRejectRate
        this.minRejectEqptRejectRate = res.data.minRejectEqptRejectRate
        this.maxRejectEqptDaum = this.formatNum(res.data.maxRejectEqptDaum.toString())
        this.closeTimeTotal = this.formatNum(res.data.closeTimeTotal.toString())
        this.maxdownFaultReasonCloseTimeTotal = this.formatNum(res.data.maxdownFaultReasonCloseTimeTotal.toString())
        this.maxdownFaultReasonCloseNum = this.formatNum(res.data.maxdownFaultReasonCloseNum.toString())
        this.maxdownEqptCloseNum = this.formatNum(res.data.maxdownEqptCloseNum.toString())
        this.maxdownEqptCloseTimeTotal = this.formatNum(res.data.maxdownEqptCloseTimeTotal.toString())
        this.minRejectEqptDanum = this.formatNum(res.data.minRejectEqptDanum.toString())
        this.closeNum = this.formatNum(res.data.closeNum.toString())
      })
    },
    // 异常停机分析
    downResonFun() {
      const params = {
        timeFame: this.activeTime
      }
      downReson(params).then(res => {
        this.downResonList = res.data
        var titleArray = []
        var dataArray = []
        for (const item of this.downResonList) {
          titleArray.push(item.downReson)
          dataArray.push({
            value: item.downNum,
            name: item.downReson
          })
        }
        this.abnormalOptions.legend.data = titleArray
        this.abnormalOptions.series[0].data = dataArray
      })
    },
    // 获取图表数据
    getChartData(arr) {
      var xAxisData = []
      var dataArray = []
      for (const item of arr) {
        xAxisData.push(item.eqptNum + '#')
        dataArray.push({
          value: item.rejectRatio,
          eqptId: item.eqptId
        })
      }
      return {
        xAxisData,
        dataArray
      }
    },
    // 设备报废率分析
    rejectTrendFun() {
      const params = {
        timeFame: this.activeTime
      }
      rejectTrend(params).then(res => {
        this.equipmentList = res.data
        this.chartSort(1, this.equipmentOptions, 0)
        this.chartSort(1, this.equipment250Options, 1)
        this.chartSort(1, this.equipment350Options, 2)
        this.chartSort(1, this.equipment500Options, 3)
        this.chartSort(1, this.equipment650Options, 4)
        this.chartSort(1, this.equipment800Options, 5)
        this.chartSort(1, this.equipment900Options, 6)
      })
    },
    viewAllEquipment() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[0].descRejectList
    },
    viewAllEquipment250() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[1].descRejectList
    },
    viewAllEquipment350() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[2].descRejectList
    },
    viewAllEquipment500() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[3].descRejectList
    },
    viewAllEquipment650() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[4].descRejectList
    },
    viewAllEquipment800() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[5].descRejectList
    },
    viewAllEquipment900() {
      this.detailEquipmentVisible = true
      this.equipmentDetailList = this.equipmentList[6].descRejectList
    },
    // tabs
    handleClick() {
      this.overviewFun()
      this.downResonFun()
      this.rejectTrendFun()
    },
    // 点击柱子
    barClick(data) {
      this.$router.push({ path: '/routine/equipmentDetail', query: { id: data, tm: this.activeTime }})
    },
    // 数据源跳至详情页
    jupmToDetail(row) {
      this.$router.push({ path: '/routine/equipmentDetail', query: { id: row.eqptId, tm: this.activeTime }})
    },
    // 图表排序
    chartSort(val, options, index) {
      var chartData = {}
      if (val === 1) {
        chartData = this.getChartData(this.equipmentList[index].descRejectList)
      } else if (val === 2) {
        chartData = this.getChartData(this.equipmentList[index].ascRejectList)
      } else {
        chartData = this.getChartData(this.equipmentList[index].ascEqptNumList)
      }
      options.xAxis[0].data = chartData.xAxisData
      options.series[0].data = chartData.dataArray
      if (options.dataZoom) {
        options.dataZoom[0].end = Math.floor(30 / this.equipmentList[index].descRejectList.length * 100)
      }
    },
    // 全部设备排序
    quipmentSort(val) {
      this.chartSort(val, this.equipmentOptions, 0) // 0:单选值， 1：当前option,   3:equipmentList对应的索引
    },
    quipment250Sort(val) {
      this.chartSort(val, this.equipment250Options, 1)
    },
    quipment350Sort(val) {
      this.chartSort(val, this.equipment350Options, 2)
    },
    quipment500Sort(val) {
      this.chartSort(val, this.equipment500Options, 3)
    },
    quipment650Sort(val) {
      this.chartSort(val, this.equipment650Options, 4)
    },
    quipment800Sort(val) {
      this.chartSort(val, this.equipment800Options, 5)
    },
    quipment900Sort(val) {
      this.chartSort(val, this.equipment900Options, 6)
    }
  }
}
