import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { productReject, productEverydayTrend, rejectRatioSort, rejectStabilitySort } from '@/api/report/product'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      activeTime: '0',
      num: 0.12,
      castVisible: false,
      productTrendDataLoading: true,
      list: [{}, {}, {}],
      productTrendData: [],
      productTrendOptions: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var result = params[0].name + '<br>'
            params.forEach(function(item) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
              if (item.seriesName === '报废率') {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data + ' %</span><br>'
              } else {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data + '</span>'
              }
            })
            return result
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['报废率', '生产总数']
        },
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
            right: 65, // 右边的距离
            bottom: 20, // 右边的距离
            fillerColor: '#d3d3d3', // 选中范围的填充颜色。
            backgroundColor: '#f9f9f9', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            filterMode: 'filter'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'line'
            },
            splitLine: {
              show: false
            },
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
            boundaryGap: false, // x 轴从0开始
            axisLabel: {
              margin: 40,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '报废率',
            min: 0,
            max: 100,
            interval: 25,
            splitLine: {
              show: false
            },
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
          },
          {
            type: 'value',
            name: '生产总数',
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
              formatter: '{value}'
            }
          }
        ],
        grid: {
          x: 40,
          y: 27,
          x2: 65,
          y2: 38
        },
        series: [
          {
            name: '报废率',
            cursor: 'default',
            type: 'line',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            data: []
          },
          {
            name: '生产总数',
            cursor: 'default',
            type: 'line',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      topOptions: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var result = params[0].name + '<br>'
            params.forEach(function(item) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
              if (item.seriesName === '报废率') {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data.value + ' %</span><br>'
              } else {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data.value + '</span>'
              }
            })
            return result
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['报废率', '生产总数'],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
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
              // interval: 0
              // rotate: -30
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '报废率',
            min: 0,
            max: 100,
            interval: 25,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            }
          },
          {
            type: 'value',
            name: '生产总数',
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        grid: {
          x: 40,
          y: 27,
          x2: 65,
          y2: 23
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            name: '报废率',
            type: 'bar',
            data: []
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            name: '生产总数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      btmOptions: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var result = params[0].name + '<br>'
            params.forEach(function(item) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
              if (item.seriesName === '报废率') {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data.value + ' %</span><br>'
              } else {
                result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data.value + '</span>'
              }
            })
            return result
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['报废率', '生产总数'],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
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
              // interval: 0,
              // rotate: -30
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '报废率',
            min: 0,
            max: 100,
            interval: 25,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            }
          },
          {
            type: 'value',
            name: '生产总数',
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            }
          }
        ],
        grid: {
          x: 40,
          y: 27,
          x2: 65,
          y2: 23
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            name: '报废率',
            type: 'bar',
            data: []
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            name: '生产总数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      stabilityOptions: {
        color: ['#009494'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a}: {c}'
        },
        grid: {
          x: 40,
          y: 27,
          x2: 40,
          y2: 23
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
              // rotate: -30
            }
          }
        ],
        yAxis: [
          {
            name: '标准方差',
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
            }
          }
        ],
        series: [
          {
            name: '标准方差',
            cursor: 'default',
            type: 'bar',
            barMaxWidth: '15',
            barMinHeight: 5,
            data: [101, 100, 99, 98, 97, 96, 95, 94, 93, 92]
          }
        ]
      },
      stabilityOptionsBtm: {
        color: ['#009494'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a}: {c}'
        },
        grid: {
          x: 25,
          y: 27,
          x2: 40,
          y2: 23
        },
        xAxis: [
          {
            type: 'category',
            data: ['产品1#', '产品2#', '产品3#', '产品4#', '产品5#', '产品6#', '产品7#', '产品8#', '产品9#', '产品10#'],
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
              // rotate: -30
            }
          }
        ],
        yAxis: [
          {
            name: '标准方差',
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
            }
          }
        ],
        series: [
          {
            name: '标准方差',
            cursor: 'default',
            type: 'bar',
            barMaxWidth: '15',
            barMinHeight: 5,
            data: [101, 100, 99, 98, 97, 96, 95, 94, 93, 92]
          }
        ]
      },
      minRejectRatioName: '',
      minRejectRatioRejectNum: '',
      minRejectRatioRejectRatio: '',
      maxRejectRatioName: '',
      maxRejectRatioRejectNum: '',
      maxRejectRatioRejectRatio: '',
      maxProductName: '',
      maxProductRejectNum: '',
      maxProductRejectRatio: '',
      minProductName: '',
      minProductRejectNum: '',
      minProductRejectRatio: '',
      mostStableName: '',
      mostStableRejectNum: '',
      mostStableRejectRatio: '',
      mostUnStableName: '',
      mostUnStableRejectNum: '',
      mostUnStableRejectRatio: '',
      totaldaNum: '',
      totalRejectNum: '',
      totalRejectRatio: '',
      daNumTerm: '',
      rejectNumTerm: '',
      rejectRatioTerm: '',
      beginTime: '',
      endTime: '',
      minRejectRatioProductId: '',
      maxRejectRatioProductId: '',
      maxProductId: '',
      minProductId: '',
      mostStableProductId: '',
      dialogTitle: ''
    }
  },
  watch: {
  },
  created() {
    if (this.$route.query.tm) {
      this.activeTime = this.$route.query.tm
    }
    this.productRejectFun()
    this.rejectRatioSortFun()
    this.rejectStabilitySortFun()
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
    // 产品总览
    productRejectFun() {
      const params = {
        timeFame: this.activeTime
      }
      productReject(params).then(res => {
        this.beginTime = res.data.beginTime
        this.endTime = res.data.endTime
        this.totaldaNum = this.formatNum(res.data.totalRejectInfo.daNum.toString())
        this.totalRejectNum = this.formatNum(res.data.totalRejectInfo.rejectNum.toString())
        this.totalRejectRatio = res.data.totalRejectInfo.rejectRatio
        this.daNumTerm = res.data.totalRejectInfo.daNumTerm
        this.rejectNumTerm = res.data.totalRejectInfo.rejectNumTerm
        this.rejectRatioTerm = res.data.totalRejectInfo.rejectRatioTerm
        this.minRejectRatioName = res.data.minRejectRatio.productName
        this.minRejectRatioRejectNum = res.data.minRejectRatio.rejectRatio
        this.minRejectRatioProductId = res.data.minRejectRatio.productId
        this.minRejectRatioRejectRatio = this.formatNum(res.data.minRejectRatio.rejectNum.toString())
        this.maxRejectRatioName = res.data.maxRejectRatio.productName
        this.maxRejectRatioProductId = res.data.maxRejectRatio.productId
        this.maxRejectRatioRejectNum = res.data.maxRejectRatio.rejectRatio
        this.maxRejectRatioRejectRatio = this.formatNum(res.data.maxRejectRatio.rejectNum.toString())
        this.maxProductName = res.data.maxProduct.productName
        this.maxProductRejectRatio = res.data.maxProduct.rejectRatio
        this.maxProductId = res.data.maxProduct.productId
        this.maxProductRejectNum = this.formatNum(res.data.maxProduct.rejectNum.toString())
        this.minProductName = res.data.minProduct.productName
        this.minProductId = res.data.minProduct.productId
        this.minProductRejectRatio = res.data.minProduct.rejectRatio
        this.minProductRejectNum = this.formatNum(res.data.minProduct.rejectNum.toString())
        this.mostStableName = res.data.mostStable.productName
        this.mostStableRejectRatio = res.data.mostStable.rejectRatio
        this.mostStableProductId = res.data.mostStable.productId
        this.mostStableRejectNum = this.formatNum(res.data.mostStable.rejectNum.toString())
        this.mostUnStableName = res.data.mostUnstable.productName
        this.mostUnStableRejectRatio = res.data.mostUnstable.rejectRatio
        this.mostUnStableProductId = res.data.mostUnstable.productId
        this.mostUnStableRejectNum = this.formatNum(res.data.mostUnstable.rejectNum.toString())
        this.productEverydayTrendFun()
      })
    },
    productEverydayTrendFun() {
      this.productTrendDataLoading = true
      const params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageNum: 1,
        pageSize: 10000
      }
      productEverydayTrend(params).then(res => {
        this.productTrendDataLoading = false
        this.productTrendData = res.data.list
        var xAxisData = []
        var rejectArray = []
        var daNumArray = []
        for (const item of res.data.list) {
          xAxisData.push(item.everyday.substr(5, 5))
          rejectArray.push(item.rejectRatio)
          daNumArray.push(item.daNum)
        }
        this.productTrendOptions.xAxis[0].data = xAxisData
        this.productTrendOptions.series[0].data = rejectArray
        this.productTrendOptions.series[1].data = daNumArray
        if (res.data.list.length > 30) {
          this.productTrendOptions.dataZoom[0].start = 100 - Math.floor(30 / res.data.list.length * 100)
          this.productTrendOptions.dataZoom[0].show = true
          this.productTrendOptions.xAxis[0].axisLabel.margin = 20
        } else {
          this.productTrendOptions.dataZoom[0].show = false
          this.productTrendOptions.xAxis[0].axisLabel.margin = 10
        }
      })
    },
    rejectRatioSortFun() {
      const params = {
        timeFame: this.activeTime
      }
      rejectRatioSort(params).then(res => {
        var xAxisData = []
        var xAxisDataBtm = []
        var rejectArray = []
        var rejectArrayBtm = []
        var daNumArray = []
        var daNumArrayBtm = []
        for (const item of res.data.productRejectRatioASC) {
          // xAxisData.push(item.everyday.substr(5, 5))
          xAxisData.push(item.productName)
          rejectArray.push({
            value: item.rejectRatio,
            eqptId: item.productId
          })
          daNumArray.push({
            value: item.daNum,
            eqptId: item.productId
          })
        }
        for (const item of res.data.productRejectRatioDESC) {
          // xAxisData.push(item.everyday.substr(5, 5))
          xAxisDataBtm.push(item.productName)
          rejectArrayBtm.push({
            value: item.rejectRatio,
            eqptId: item.productId
          })
          daNumArrayBtm.push({
            value: item.daNum,
            eqptId: item.productId
          })
        }
        this.topOptions.xAxis[0].data = xAxisData
        this.topOptions.series[0].data = rejectArray
        this.topOptions.series[1].data = daNumArray
        this.btmOptions.xAxis[0].data = xAxisDataBtm
        this.btmOptions.series[0].data = rejectArrayBtm
        this.btmOptions.series[1].data = daNumArrayBtm
      })
    },
    rejectStabilitySortFun() {
      const params = {
        timeFame: this.activeTime
      }
      rejectStabilitySort(params).then(res => {
        console.log(res)
        var xAxisData = []
        var xAxisDataBtm = []
        var daNumArray = []
        var daNumArrayBtm = []
        for (const item of res.data.productRejectStabilityASC) {
          xAxisData.push(item.productName)
          daNumArray.push(item.stdDev)
        }
        for (const item of res.data.productRejectStabilityDESC) {
          // xAxisData.push(item.everyday.substr(5, 5))
          xAxisDataBtm.push(item.productName)
          daNumArrayBtm.push(item.stdDev)
        }
        this.stabilityOptions.xAxis[0].data = xAxisData
        this.stabilityOptions.series[0].data = daNumArray
        this.stabilityOptionsBtm.xAxis[0].data = xAxisDataBtm
        this.stabilityOptionsBtm.series[0].data = daNumArrayBtm
      })
    },
    viewAll() {
      console.log('查看全部')
    },
    // 产品趋势源数据
    viewTendencyAll() {
      this.$router.push({ path: '/routine/productTrend', query: { st: this.beginTime, et: this.endTime }})
    },
    // tabs
    handleClick() {
      this.productRejectFun()
      this.rejectRatioSortFun()
      this.rejectStabilitySortFun()
    },
    // 从产品总览到详情
    jumpToDetail(id) {
      this.$router.push({ path: '/routine/productDetail', query: { id: id, tm: this.activeTime }})
    },
    // 点击前后10产品柱子到详情
    barClick(data) {
      this.$router.push({ path: '/routine/productDetail', query: { id: data, tm: this.activeTime }})
    },
    // 查看全部list
    viewAllProductList() {
      this.$router.push({ path: '/routine/productList', query: { tm: this.activeTime, st: this.beginTime, et: this.endTime }})
    }
  }
}
