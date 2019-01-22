import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { summary, reason, reasonDetail, productThan } from '@/api/report/abnormal'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      scrapFormDataLoading: true,
      activeTime: '0',
      currentNum: 0,
      currentMachiningNum: 0,
      currentInspectionNum: 0,
      num: 0.12,
      castVisible: false,
      detailList: [],
      detailList1: [],
      detailList2: [],
      detailList3: [],
      abnormalData: [],
      rate: '',
      rate1: '',
      rate2: '',
      rate3: '',
      daNum: '',
      daNum1: '',
      daNum2: '',
      daNum3: '',
      yzList: [],
      zjList: [],
      yhList: [],
      jjgList: [],
      machineOptions: {
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
          y2: 20
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '报废率',
            type: 'bar',
            data: []
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '生产总数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      jjgContrastOptions: {
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
          y2: 20
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '报废率',
            type: 'bar',
            data: []
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '生产总数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      yhContrastOptions: {
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
          y2: 20
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '报废率',
            type: 'bar',
            data: []
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '生产总数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      abnormalOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
          orient: 'vertical',
          x: '70%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: [],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        series: [
          {
            name: '报废环节',
            cursor: 'default',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            // radius: ['50%', '70%'],
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
            data: [
              { value: 335, name: '压铸报废' },
              { value: 310, name: '机加工报废' },
              { value: 234, name: '氧化终检报废' }
            ],
            center: ['35%', '50%']
          }
        ]
      },
      machiningOptions: {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var result = params.name + '<br>'
            result += '报废总数: ' + params.value + '<br>'
            result += '占比: ' + params.percent + '%'
            return result
          }
        },
        legend: {
          orient: 'vertical',
          x: '80%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: [],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        series: [
          {
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            cursor: 'default',
            radius: ['0', '60%'],
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
            center: ['40%', '50%']
          }
        ]
      },
      yhOptions: {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var result = params.name + '<br>'
            result += '报废总数: ' + params.value + '<br>'
            result += '占比: ' + params.percent + '%'
            return result
          }
        },
        legend: {
          orient: 'vertical',
          x: '80%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: [],
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        series: [
          {
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            radius: ['0', '60%'],
            cursor: 'default',
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
            center: ['40%', '50%']
          }
        ]
      },
      castingOptions: {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          formatter: function(params) {
            if (params.name !== '') {
              var result = params.name + '<br>'
              result += '报废总数: ' + params.value + '<br>'
              result += '占比: ' + params.percent + '%'
              return result
            }
          }
        },
        legend: {
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          // itemGap: 40, // 设置间距
          orient: 'vertical',
          x: '80%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: []
        },
        series: [
          {
            type: 'pie',
            cursor: 'default',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            minAngle: 2, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            radius: [0, '50%'],
            label: {
              normal: {
                position: 'inner'
              }
            }, // 扇形区域内显示文字
            data: [],
            center: ['30%', '50%']
            // color: ['#10EFE0', '#EF42A4', '#FF8F03']
          },
          {
            type: 'pie',
            cursor: 'default',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            minAngle: 2, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            radius: ['50%', '70%'],
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [],
            center: ['30%', '50%'],
            color: ['#d53a35', '#d56c28', '#D58C52', 'transparent', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E', '#D55A0F', '#A476D5', '#D5809A'],
            startAngle: 90
          }
        ]
      },
      anum: '',
      aratio: '',
      lrate: '',
      lratio: '',
      zggx: '',
      zghb: '',
      zgrate: '',
      yzyy: '',
      yznum: '',
      yzzb: '',
      jjgnum: '',
      jjgyy: '',
      jjgrate: '',
      yhyy: '',
      yhnum: '',
      yhrate: '',
      dialogTitle: '',
      productThanData: [],
      scrapFormData: []
    }
  },
  watch: {
  },
  created() {
    if (this.$route.query.tm) {
      this.activeTime = this.$route.query.tm
    }
    this.summaryFun()
    this.reasonFun()
    this.productThanFun(0, 0)
    this.productThanFun(1, 0)
    this.productThanFun(2, 0)
  },
  mounted() {
    this.reasonDetailFun(0)
    this.reasonDetailFun(1)
    this.reasonDetailFun(2)
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
    // 总览信息
    summaryFun() {
      const params = {
        days: this.activeTime
      }
      summary(params).then(res => {
        this.anum = this.formatNum(res.data.anum.toString())
        this.yznum = this.formatNum(res.data.yznum.toString())
        this.jjgnum = this.formatNum(res.data.jjgnum.toString())
        this.yhnum = this.formatNum(res.data.yhnum.toString())
        this.aratio = res.data.aratio.toFixed(2)
        this.lrate = res.data.lrate.toFixed(2)
        this.lratio = res.data.lratio.toFixed(2)
        this.zghb = res.data.zghb.toFixed(2)
        this.zgrate = res.data.zgrate.toFixed(2)
        this.yzzb = res.data.yzzb.toFixed(2)
        this.jjgrate = res.data.jjgrate.toFixed(2)
        this.yhrate = res.data.yhrate.toFixed(2)
        this.zggx = res.data.zggx
        this.yzyy = res.data.yzyy.split('，')
        this.jjgyy = res.data.jjgyy.split('，')
        this.yhyy = res.data.yhyy.split('，')
        this.yzyyAll = res.data.yzyy
        this.jjgyyAll = res.data.jjgyy
        this.yhyyAll = res.data.yhyy
        this.abnormalData = res.data.list
        var legendData = []
        var daNumArray = []
        for (const item of res.data.list) {
          legendData.push(item.name)
          daNumArray.push({
            name: item.name,
            value: item.num
          })
        }
        this.abnormalOptions.legend.data = legendData
        this.abnormalOptions.series[0].data = daNumArray
      })
    },
    // 报废构成
    reasonFun() {
      this.scrapFormDataLoading = true
      const params = {
        days: this.activeTime
      }
      reason(params).then(res => {
        this.scrapFormDataLoading = false
        // 压铸报废构成
        this.scrapFormData = res.data.yzList
        this.yzList = res.data.yzList
        this.zjList = res.data.zjList
        this.jjgList = res.data.jjgList
        this.yhList = res.data.yhList
        var legendData = []
        var daNumArray = []
        var zjSeriesArray = []
        for (const item of this.yzList) {
          legendData.push(item.reason)
          daNumArray.push({
            name: item.reason,
            value: item.num
          })
        }
        var totalNum = 0
        for (const item of this.zjList) {
          totalNum += item.num
          zjSeriesArray.push({
            name: item.reason,
            value: item.num
          })
        }
        zjSeriesArray.push({
          value: (totalNum * (100 - this.yzList[0].rate)) / this.yzList[0].rate
        })
        if (zjSeriesArray.length === 1) {
          this.castingOptions.series[1].color = ['transparent']
        } else if (zjSeriesArray.length === 2) {
          this.castingOptions.series[1].color = ['#D55A0F', 'transparent']
        } else if (zjSeriesArray.length === 3) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D53154']
        } else if (zjSeriesArray.length === 4) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D53154', '#D56482']
        } else if (zjSeriesArray.length === 5) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154']
        } else if (zjSeriesArray.length === 6) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58']
        } else if (zjSeriesArray.length === 7) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F']
        } else if (zjSeriesArray.length === 8) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E']
        } else if (zjSeriesArray.length === 9) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E', '#D55b0F']
        } else if (zjSeriesArray.length === 10) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E', '#D55b0F', '#A476D5']
        } else if (zjSeriesArray.length === 11) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E', '#D55b0F', '#A476D5', '#D5809A']
        } else if (zjSeriesArray.length === 12) {
          this.castingOptions.series[1].color = ['#D55A0F', '#d56c28', 'transparent', '#D58C52', '#D56482', '#D53154', '#D58D58', '#D5777F', '#D5166E', '#D55b0F', '#A476D5', '#D5809A', '#aaa']
        }
        this.castingOptions.legend.data = legendData
        this.castingOptions.series[0].data = daNumArray
        if (zjSeriesArray.length > 1) {
          this.castingOptions.series[1].data = zjSeriesArray
          this.castingOptions.legend.x = '80%'
        } else {
          this.castingOptions.series[1].data = []
          this.castingOptions.legend.x = '65%'
        }
        // 机加工报废构成
        var machiningLegendData = []
        var machiningNumArray = []
        for (const item of this.jjgList) {
          machiningLegendData.push(item.reason)
          machiningNumArray.push({
            name: item.reason,
            value: item.num
          })
        }
        this.machiningOptions.legend.data = machiningLegendData
        this.machiningOptions.series[0].data = machiningNumArray
        // 氧化终检
        var yhLegendData = []
        var yhNumArray = []
        for (const item of this.yhList) {
          yhLegendData.push(item.reason)
          yhNumArray.push({
            name: item.reason,
            value: item.num
          })
        }
        this.yhOptions.legend.data = yhLegendData
        this.yhOptions.series[0].data = yhNumArray
      })
    },
    // 报废构成详情
    reasonDetailFun(process) {
      const params = {
        days: this.activeTime,
        process: process
      }
      reasonDetail(params).then(res => {
        if (process === 0) {
          this.detailList1 = res.data.list
          this.rate1 = res.data.rate
          this.daNum1 = this.formatNum(res.data.num.toString())
        } else if (process === 1) {
          this.detailList2 = res.data.list
          this.rate2 = res.data.rate
          this.daNum2 = this.formatNum(res.data.num.toString())
        } else {
          this.detailList3 = res.data.list
          this.rate3 = res.data.rate
          this.daNum3 = this.formatNum(res.data.num.toString())
        }
      })
    },
    // 产品对比
    productThanFun(process, orderWay) {
      const params = {
        days: this.activeTime,
        process: process,
        orderWay: orderWay
      }
      productThan(params).then(res => {
        this.productThanData = res.data
        if (process === 0) {
          this.darwCharts(res.data, this.machineOptions)
        } else if (process === 1) {
          this.darwCharts(res.data, this.jjgContrastOptions)
        } else {
          this.darwCharts(res.data, this.yhContrastOptions)
        }
      })
    },
    // 绘制图表
    darwCharts(arr, chartOptions) {
      var xAxisData = []
      var rejectArray = []
      var daNumArray = []
      for (const item of arr) {
        xAxisData.push(item.name)
        rejectArray.push(item.rate)
        daNumArray.push(item.pnum)
      }
      chartOptions.xAxis[0].data = xAxisData
      chartOptions.series[0].data = rejectArray
      chartOptions.series[1].data = daNumArray
    },
    viewAll() {
      console.log('查看全部')
    },
    // 全部压铸
    viewAllYz() {
      this.detailList = this.detailList1
      this.rate = this.rate1
      this.daNum = this.daNum1
      this.dialogTitle = '压铸报废构成'
      this.castVisible = true
    },
    // 全部机加工
    viewAllMachine() {
      this.detailList = this.detailList2
      this.rate = this.rate2
      this.daNum = this.daNum2
      this.dialogTitle = '机加工报废构成'
      this.castVisible = true
    },
    // 全部氧化
    viewAllCombustion() {
      this.detailList = this.detailList3
      this.rate = this.rate3
      this.daNum = this.daNum3
      this.dialogTitle = '氧化终检报废构成'
      this.castVisible = true
    },
    // tabs
    handleClick() {
      this.summaryFun()
      this.reasonFun()
      this.productThanFun(0, 0)
      this.productThanFun(1, 0)
      this.productThanFun(2, 0)
      // 查看全部
      setTimeout(() => {
        this.reasonDetailFun(0)
        this.reasonDetailFun(1)
        this.reasonDetailFun(2)
      }, 1000)
    },
    // 前后10条切换
    switchBtn(num) {
      this.currentNum = num
      this.productThanFun(0, num)
    },
    // 机加工产品对比前后10条切换
    machiningSwitchBtn(num) {
      this.currentMachiningNum = num
      this.productThanFun(1, num)
    },
    // 氧化终检对比前后10条切换
    inspectionSwitchBtn(num) {
      this.productThanFun(2, num)
      this.currentInspectionNum = num
    },
    // 全部产品
    viewAllProduct() {
      this.$router.push({ path: '/routine/abnormalProduct', query: { tm: this.activeTime }})
    }
  }
}
