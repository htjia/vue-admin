import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { everyShiftReject, mostResonShift, everyUserDaNum, everyUserRejectNum, everydayShiftRject } from '@/api/report/classes'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      activeTime: '0',
      num: 0.12,
      classList: [],
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
                color: '#474747',
                width: 1
              }
            },
            axisTick: {
              lineStyle: {
                color: '#474747'
              }
            },
            axisLabel: {
              interval: 0
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
                color: '#474747',
                width: 1
              }
            },
            axisTick: {
              show: true,
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
          x2: 70,
          y2: 20
        },
        series: [
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            cursor: 'default',
            name: '报废率',
            type: 'bar',
            data: [2.0, 2.2, 3.3]
          },
          {
            barMaxWidth: '15',
            barMinHeight: 5,
            name: '生产总数',
            cursor: 'default',
            type: 'bar',
            yAxisIndex: 1,
            data: [70.7, 175.6, 182.2]
          }
        ]
      },
      options: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var result = params[0].name + '<br>'
            params.forEach(function(item) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
              result += item.seriesName + ' : ' + '<span style="color:#fff">' + item.data + ' %</span><br>'
              // }else if(parseFloat(item.data)<0){
            })
            return result
          }
        },
        legend: {
          data: ['甲班', '乙班', '丙班', '全部']
        },
        noDataLoadingOption: {
          text: '暂无数据',
          effect: 'bubble',
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        xAxis: [
          {
            name: '时间',
            type: 'category',
            data: ['2018-11-1', '2018-11-2', '2018-11-3', '2018-11-4', '2018-11-5', '2018-11-6', '2018-11-7', '2018-11-8', '2018-11-9', '2018-11-10', '2018-11-11', '2018-11-12', '2018-11-13', '2018-11-14'],
            nameTextStyle: {
              color: '#474747'
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
              margin: 15,
              interval: 0
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            },
            boundaryGap: false
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
            left: 50, // 左边的距离
            right: 5, // 右边的距离
            bottom: 21, // 右边的距离
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
            // axisLabel: {
            //   show: true,
            //   margin: 15
            // }
          }
        ],
        series: [
          {
            name: '甲班',
            cursor: 'default',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10, 10, 10, 10, 10, 10, 10, 10]
          },
          {
            name: '乙班',
            cursor: 'default',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            type: 'line',
            data: [2, 4, 5, 6, 4, 3, 4, 5, 7, 8, 5, 3, 3, 2]
          },
          {
            name: '丙班',
            cursor: 'default',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            type: 'line',
            data: [3, 2, 3, 5, 4, 6, 7, 3, 2, 3, 5, 6, 5, 4]
          },
          {
            name: '全部',
            cursor: 'default',
            hoverAnimation: false,
            symbolSize: 8, // 折线点的大小
            type: 'line',
            data: [3, 2, 3, 5, 4, 6, 7, 3, 2, 3, 5, 6, 5, 4]
          }
        ],
        grid: {
          x: 50,
          y: 30,
          x2: 5,
          y2: 40
        },
        color: ['#c5221f', '#87cefa', '#da70d6', '#009494']
      },
      classesDaNumOptions: {
        title: {
          text: '班次生产总数分布',
          left: 'center',
          textStyle: {
            color: '#494949',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          orient: 'vertical',
          x: '80%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: ['甲班', '乙班', '丙班']
        },
        series: [
          {
            name: '生产总数对比',
            selectedMode: 'single',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
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
              { value: 335, name: '甲班' },
              { value: 310, name: '乙班' },
              { value: 234, name: '丙班' }
            ],
            center: ['35%', '50%']
          }
        ]
      },
      classesRejectNumOptions: {
        title: {
          text: '班次报废总数分布',
          left: 'center',
          textStyle: {
            color: '#494949',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          orient: 'vertical',
          x: '80%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: ['甲班', '乙班', '丙班']
        },
        series: [
          {
            name: '报废总数对比',
            selectedMode: 'single',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
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
              { value: 335, name: '甲班' },
              { value: 310, name: '乙班' },
              { value: 234, name: '丙班' }
            ],
            center: ['35%', '50%']
          }
        ]
      },
      userDaNumOptions: {
        color: ['#009494'],
        title: {
          text: '操作工加工总数top10 一 车间',
          left: 'center',
          textStyle: {
            color: '#494949',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a}: {c}'
        },
        grid: {
          x: 80,
          y: 30,
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
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '生产总数',
            axisLine: {
              lineStyle: {
                color: '#474747',
                width: 1
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#474747'
              }
            }
          }
        ],
        series: [
          {
            name: '生产总数',
            cursor: 'default',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: [225, 221, 198, 190, 188, 187, 185, 182, 180, 177]
          }
        ]
      },
      userRejectNumOptions: {
        color: ['#009494'],
        title: {
          text: '操作工报废总数top10 一 车间',
          left: 'center',
          textStyle: {
            color: '#494949',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a}: {c}'
        },
        grid: {
          x: 80,
          y: 30,
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
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n')
              // }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '报废总数',
            axisLine: {
              lineStyle: {
                color: '#474747',
                width: 1
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#474747'
              }
            }
          }
        ],
        series: [
          {
            name: '报废总数',
            cursor: 'default',
            barMaxWidth: '15',
            barMinHeight: 5,
            type: 'bar',
            data: [225, 221, 198, 190, 188, 187, 185, 182, 180, 177]
          }
        ]
      },
      checkReject: {},
      lmReject: {
        rejectNum: ''
      },
      mostDown: {
        rejectNum: '',
        downTimes: ''
      },
      userReject: {
        rejectNum: ''
      },
      everydayShiftRjectData: [],
      userDaNumOptionsData: [],
      currentClickPie: '',
      rejectNumClickPie: ''
    }
  },
  watch: {
  },
  created() {
    if (this.$route.query.tm) {
      this.activeTime = this.$route.query.tm
    }
    this.everyShiftRejectFun()
    this.mostResonShiftFun()
    this.everyUserDaNumFun()
    this.everyUserRejectNumFun()
    this.everydayShiftRjectFun()
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
    // 班次总览
    everyShiftRejectFun() {
      const params = {
        timeFame: this.activeTime
      }
      everyShiftReject(params).then(res => {
        var xAxisData = []
        var rejectArray = []
        var daNumArray = []
        var pieDaNumArray = []
        var pieRejectNumArray = []
        for (const item of res.data) {
          xAxisData.push(item.shiftName)
          rejectArray.push(item.rejectRatio)
          daNumArray.push(item.daNum)
          pieDaNumArray.push({
            value: item.daNum,
            name: item.shiftName
          })
          pieRejectNumArray.push({
            value: item.rejectNum,
            name: item.shiftName
          })
        }
        // 头部柱状图
        this.machineOptions.xAxis[0].data = xAxisData
        this.machineOptions.series[0].data = rejectArray
        this.machineOptions.series[1].data = daNumArray
        // 底部饼图
        this.classesDaNumOptions.legend.data = xAxisData
        this.classesDaNumOptions.series[0].data = pieDaNumArray
        this.classesRejectNumOptions.legend.data = xAxisData
        this.classesRejectNumOptions.series[0].data = pieRejectNumArray
        this.classList = res.data
        for (const item of this.classList) {
          item.daNum = this.formatNum(item.daNum.toString())
          item.rejectNum = this.formatNum(item.rejectNum.toString())
        }
      })
    },
    // 报废类型最多班次
    mostResonShiftFun() {
      const params = {
        timeFame: this.activeTime
      }
      mostResonShift(params).then(res => {
        if (res.data.checkReject !== null) {
          this.checkReject = res.data.checkReject
          this.lmReject = res.data.lmReject
          this.mostDown = res.data.mostDown
          this.userReject = res.data.userReject
        } else {
          this.checkReject = {
            shiftName: '',
            rejectNum: '0'
          }
          this.lmReject = {
            shiftName: '',
            rejectNum: '0'
          }
          this.mostDown = {
            shiftName: '',
            downNum: '0',
            downTimes: '0'
          }
          this.userReject = {
            shiftName: '',
            rejectNum: '0'
          }
        }
      })
    },
    // 生产总数对比
    everyUserDaNumFun(params) {
      const requestParams = params || {
        timeFame: this.activeTime,
        shiftName: ''
      }
      everyUserDaNum(requestParams).then(res => {
        this.userDaNumOptionsData = res.data
        var xAxisData = []
        var daNumArray = []
        for (const item of res.data) {
          xAxisData.push(item.userName)
          daNumArray.push(item.daNum)
        }
        this.userDaNumOptions.xAxis[0].data = xAxisData
        this.userDaNumOptions.series[0].data = daNumArray
      })
    },
    // 报废总数对比
    everyUserRejectNumFun(params) {
      const requestParams = params || {
        timeFame: this.activeTime,
        shiftName: ''
      }
      everyUserRejectNum(requestParams).then(res => {
        var xAxisData = []
        var daNumArray = []
        for (const item of res.data) {
          xAxisData.push(item.userName)
          daNumArray.push(item.rejectNum)
        }
        this.userRejectNumOptions.xAxis[0].data = xAxisData
        this.userRejectNumOptions.series[0].data = daNumArray
      })
    },
    // 报废趋势
    everydayShiftRjectFun() {
      const params = {
        timeFame: this.activeTime
      }
      everydayShiftRject(params).then(res => {
        this.everydayShiftRjectData = res.data.all
        var xAxisData = []
        var jRjectArray = []
        var yRjectArray = []
        var bRjectArray = []
        var aRjectArray = []
        for (const item of res.data.jshfit) {
          jRjectArray.push(item.rejectRatio)
        }
        for (const item of res.data.yshfit) {
          yRjectArray.push(item.rejectRatio)
        }
        for (const item of res.data.bshfit) {
          bRjectArray.push(item.rejectRatio)
        }
        for (const item of res.data.all) {
          xAxisData.push(item.everyday.substr(5, 5))
          aRjectArray.push(item.rejectRatio)
        }
        this.options.xAxis[0].data = xAxisData
        this.options.series[0].data = jRjectArray
        this.options.series[1].data = yRjectArray
        this.options.series[2].data = bRjectArray
        this.options.series[3].data = aRjectArray
        if (res.data.all.length > 30) {
          this.options.dataZoom[0].start = 100 - Math.floor(30 / res.data.all.length * 100)
          this.options.dataZoom[0].show = true
          this.options.xAxis[0].axisLabel.margin = 20
        } else {
          this.options.dataZoom[0].show = false
          this.options.xAxis[0].axisLabel.margin = 10
        }
      })
    },
    // 生产总数对比饼图点击事件
    daNumClick(data) {
      if (this.currentClickPie === data) {
        this.currentClickPie = ''
        this.everyUserDaNumFun()
        this.userDaNumOptions.title.text = '操作工加工总数top10 一 车间'
        this.userDaNumOptions.color = ['#009494']
      } else {
        const param = {
          timeFame: this.activeTime,
          shiftName: data
        }
        this.everyUserDaNumFun(param)
        this.currentClickPie = data
        if (data === '甲班') {
          this.userDaNumOptions.title.text = '操作工加工总数top10 一 甲班'
          this.userDaNumOptions.color = ['#d53a35']
        } else if (data === '乙班') {
          this.userDaNumOptions.title.text = '操作工加工总数top10 一 乙班'
          this.userDaNumOptions.color = ['#334b5c']
        } else {
          this.userDaNumOptions.title.text = '操作工加工总数top10 一 丙班'
          this.userDaNumOptions.color = ['#6ab0bb']
        }
      }
    },
    // 报废总数对比饼图点击事件
    rejectNumClick(data) {
      if (this.rejectNumClickPie === data) {
        this.rejectNumClickPie = ''
        this.everyUserRejectNumFun()
        this.userRejectNumOptions.title.text = '操作工报废总数top10 一 车间'
        this.userRejectNumOptions.color = ['#009494']
      } else {
        const param = {
          timeFame: this.activeTime,
          shiftName: data
        }
        this.everyUserRejectNumFun(param)
        this.rejectNumClickPie = data
        if (data === '甲班') {
          this.userRejectNumOptions.title.text = '操作工报废总数top10 一 甲班'
          this.userRejectNumOptions.color = ['#d53a35']
        } else if (data === '乙班') {
          this.userRejectNumOptions.title.text = '操作工报废总数top10 一 乙班'
          this.userRejectNumOptions.color = ['#334b5c']
        } else {
          this.userRejectNumOptions.title.text = '操作工报废总数top10 一 丙班'
          this.userRejectNumOptions.color = ['#6ab0bb']
        }
      }
    },
    viewAll() {
      console.log('查看全部')
    },
    // tabs
    handleClick() {
      this.everyShiftRejectFun()
      this.mostResonShiftFun()
      this.everyUserDaNumFun()
      this.everyUserRejectNumFun()
      this.everydayShiftRjectFun()
    }
  }
}
