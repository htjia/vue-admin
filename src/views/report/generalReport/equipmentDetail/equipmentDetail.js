import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { oneEqptReject, onedownReson, eqptOee, everydayReject, everydayDown } from '@/api/report/equipmentDetail'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      pageSize: 15,
      pageNum: 1,
      listLoading: false,
      detailVisible: false,
      detailDownVisible: false,
      detailEquipmentVisible: false,
      downResonListLoading: true,
      activeTime: '0',
      downResonList: [],
      oeeOptions: {
        tooltip: {
          trigger: 'axis',
          position: function(point, params, dom, rect, size) {
            // 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            var x = point[0]
            var y = point[1]
            var boxWidth = size.contentSize[0]
            var boxHeight = size.contentSize[1]
            var posX = 0 // x坐标位置
            var posY = 0 // y坐标位置

            if (x < boxWidth) { // 左边放不开
              posX = 5
            } else { // 左边放的下
              posX = x
            }

            if (y < boxHeight) { // 上边放不开
              posY = 5
            } else { // 上边放得下
              posY = y
            }
            return [posX, posY]
          }
        },
        legend: {
          // x: 'center',
          data: ['OEE']
        },
        radar: [
          {
            indicator: [
              { text: 'OEE综合利用率', max: 100 },
              { text: '时间利用率', max: 100 },
              { text: '良品率', max: 100 },
              { text: '性能开动率', max: 100 }
            ]
            // center: ['25%','40%'],
            // radius: 100
          }
        ],
        series: [
          {
            type: 'radar',
            cursor: 'default',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' }}},
            data: [
              {
                value: [],
                name: 'OEE综合分析'
              }
            ]
          }
        ]
      },
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
          x: '53%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: []
        },
        series: [
          {
            name: '异常分析',
            cursor: 'default',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            radius: ['0%', '60%'],
            minAngle: 2, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
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
            center: ['25%', '50%']
          }
        ]
      },
      equipmentOptions: {
        color: ['#009494'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br/>{a}: {c}%',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 40,
          y: 27,
          x2: 5,
          y2: 26
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
              margin: 15,
              interval: 0
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            },
            boundaryGap: false // x轴坐标从0开始
          }
        ],
        yAxis: [
          {
            name: '报废率',
            type: 'value',
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
            }
          }
        ],
        dataZoom: [
          {
            start: 0, // 默认为0
            end: 100,
            type: 'slider', // slider 表示有滑动块的，inside表示内置的
            show: true, // 如果为false 则不显示
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 12, // 组件高度
            left: 40, // 左边的距离
            right: 5, // 右边的距离
            bottom: 10, // 右边的距离
            fillerColor: '#d3d3d3', // 选中范围的填充颜色。
            backgroundColor: '#f9f9f9', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            filterMode: 'filter'
          }
          // 下面这个属性是里面拖到
          // {
          //   type: 'inside',
          //   show: false,
          //   xAxisIndex: [0],
          //   start: 0, // 默认为1
          //   end: 100
          // }
        ],
        series: [
          {
            name: '报废率',
            cursor: 'default',
            symbolSize: 8, // 折线点的大小
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'line',
            hoverAnimation: false,
            data: []
          }
        ]
      },
      stopOptions: {
        color: ['#009494'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br/>{a}: {c} 次',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 20,
          y: 27,
          x2: 5,
          y2: 26
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
              margin: 15,
              interval: 0
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            }
          }
        ],
        yAxis: [
          {
            name: '次数',
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
            type: 'value'
          }
        ],
        dataZoom: [
          {
            start: 0, // 默认为0
            end: 100,
            type: 'slider', // slider 表示有滑动块的，inside表示内置的
            show: true, // 如果为false 则不显示
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 12, // 组件高度
            left: 20, // 左边的距离
            right: 5, // 右边的距离
            bottom: 10, // 右边的距离
            fillerColor: '#d3d3d3', // 选中范围的填充颜色。
            backgroundColor: '#f9f9f9', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            filterMode: 'filter'
          }
          // 下面这个属性是里面拖到
          // {
          //   type: 'inside',
          //   show: false,
          //   xAxisIndex: [0],
          //   start: 0, // 默认为1
          //   end: 100
          // }
        ],
        series: [
          {
            name: '停机次数',
            cursor: 'default',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: []
          },
          {
            name: '停机次数',
            cursor: 'default',
            symbolSize: 0, // 折线点的大小
            type: 'line',
            hoverAnimation: false,
            data: []
          }
        ]
      },
      eqptId: '',
      eqptBrand: '',
      eqptmodel: '',
      rejectatio: '',
      daNum: '',
      beginTime: '',
      endTime: '',
      rejectNum: '',
      downNum: '',
      downTimes: '',
      maxProdutEqptCode: '',
      minProdutEqptCode: '',
      maxProdutDaNum: '',
      minProdutDaNum: '',
      maxProdutRejectatio: '',
      minProdutRejectatio: '',
      downReson: '',
      maxDownTime: '',
      maxDownNum: '',
      oeeData: {},
      everydayDownData: [],
      everydayRejectData: [],
      eqptCode: ''
    }
  },
  watch: {
  },
  created() {
    this.activeTime = this.$route.query.tm
    this.eqptId = this.$route.query.id
    this.oneEqptRejectFun()
    this.onedownResonFun()
    this.eqptOeeFun()
    const params = {
      timeFame: this.activeTime,
      eqptId: this.eqptId,
      pageSize: 10000,
      pageNum: this.pageNum
    }
    this.everydayDownFun(params)
    this.everydayRejectFun(params)
  },
  mounted() {
  },
  methods: {
    formatNum(str) {
      var newStr = ''
      var count = 0
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
          newStr = str.charAt(i) + ',' + newStr
        } else {
          newStr = str.charAt(i) + newStr
        }
        count++
      }
      str = newStr
      return str
    },
    oneEqptRejectFun() {
      const params = {
        timeFame: this.activeTime,
        eqptId: this.eqptId
      }
      oneEqptReject(params).then(res => {
        this.eqptCode = res.data.eqptCode
        this.eqptBrand = res.data.eqptBrand
        this.eqptmodel = res.data.eqptmodel
        this.rejectatio = res.data.rejectatio
        this.beginTime = res.data.beginTime
        this.endTime = res.data.endTime
        if (res.data.maxDownReson) {
          this.downReson = res.data.maxDownReson.downReson
          this.maxDownTime = this.formatNum(res.data.maxDownReson.downTimes.toString())
          this.maxDownNum = this.formatNum(res.data.maxDownReson.downNum.toString())
        } else {
          this.downReson = ''
          this.maxDownTime = ''
          this.maxDownNum = ''
        }
        if (res.data.maxProdut) {
          this.maxProdutDaNum = this.formatNum(res.data.maxProdut.daNum.toString())
          this.maxProdutRejectatio = res.data.maxProdut.rejectRatio
          this.maxProdutEqptCode = res.data.maxProdut.productName
        } else {
          this.maxProdutDaNum = ''
          this.maxProdutRejectatio = ''
          this.maxProdutEqptCode = ''
        }
        if (res.data.minRejectRatioProdut) {
          this.minProdutRejectatio = res.data.minRejectRatioProdut.rejectRatio
          this.minProdutEqptCode = res.data.minRejectRatioProdut.productName
          this.minProdutDaNum = this.formatNum(res.data.minRejectRatioProdut.daNum.toString())
        } else {
          this.minProdutRejectatio = ''
          this.minProdutEqptCode = ''
          this.minProdutDaNum = ''
        }
        this.daNum = this.formatNum(res.data.daNum.toString())
        this.rejectNum = this.formatNum(res.data.rejectNum.toString())
        this.downNum = this.formatNum(res.data.downNum.toString())
        this.downTimes = this.formatNum(res.data.downTimes.toString())
      })
    },
    onedownResonFun() {
      this.downResonListLoading = true
      const params = {
        timeFame: this.activeTime,
        eqptId: this.eqptId
      }
      onedownReson(params).then(res => {
        this.downResonListLoading = false
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
    eqptOeeFun() {
      const params = {
        timeFame: this.activeTime,
        eqptId: this.eqptId
      }
      eqptOee(params).then(res => {
        this.oeeData = res.data
        var dataArray = []
        dataArray.push(res.data.oee)
        dataArray.push(res.data.timeUseRate)
        dataArray.push(res.data.checkRate)
        dataArray.push(res.data.capabilityRate)
        this.oeeOptions.series[0].data[0].value = dataArray
      })
    },
    // 每日报废率
    everydayRejectFun(params) {
      const requestParams = params || {
        timeFame: this.activeTime,
        eqptId: this.eqptId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      everydayReject(requestParams).then(res => {
        this.everydayRejectData = res.data.list
        var xAxisData = []
        var rejectRatio = []
        for (const item of this.everydayRejectData) {
          xAxisData.push(item.everyday.substr(5, 5))
          rejectRatio.push(item.rejectRatio)
        }
        this.equipmentOptions.xAxis[0].data = xAxisData
        this.equipmentOptions.series[0].data = rejectRatio
        if (this.everydayRejectData.length > 30) {
          this.equipmentOptions.dataZoom[0].start = 100 - Math.floor(30 / this.everydayRejectData.length * 100)
        } else {
          this.equipmentOptions.dataZoom[0].show = false
        }
      })
    },
    // 每日报废率
    everydayDownFun(params) {
      const requestParams = params || {
        timeFame: this.activeTime,
        eqptId: this.eqptId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      everydayDown(requestParams).then(res => {
        this.everydayDownData = res.data.list
        var xAxisData = []
        var seriesData = []
        for (const item of this.everydayDownData) {
          xAxisData.push(item.everyday.substr(5, 5))
          seriesData.push(item.downNum)
        }
        this.stopOptions.xAxis[0].data = xAxisData
        this.stopOptions.series[0].data = seriesData
        this.stopOptions.series[1].data = seriesData
        if (this.everydayDownData.length > 30) {
          this.stopOptions.dataZoom[0].start = 100 - Math.floor(30 / this.everydayDownData.length * 100)
        } else {
          this.stopOptions.dataZoom[0].show = false
        }
      })
    },
    // 当前页数改变
    currentChange(pageNum) {
      this.pageNum = pageNum
      const params = {
        timeFame: this.activeTime,
        eqptId: this.eqptId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.everydayDownFun(params)
    },
    viewAll(data) {
      this.list = []
      if (data === 1) {
        this.detailVisible = true
      } else {
        this.detailDownVisible = true
      }
    },
    viewEquipmentAll() {
      this.detailEquipmentVisible = true
    },
    // tabs
    handleClick() {
      this.oneEqptRejectFun()
      this.onedownResonFun()
      this.eqptOeeFun()
      const params = {
        timeFame: this.activeTime,
        eqptId: this.eqptId,
        pageSize: 10000,
        pageNum: this.pageNum
      }
      this.everydayDownFun(params)
      this.everydayRejectFun(params)
    }
  }
}
