
import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import Chart from '@/components/Charts'
import { productList, productOptions, reason } from '@/api/report/abnormal'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      porductScrapVisible: false,
      machiningData: [],
      list: [],
      productOptions: [],
      productName: '',
      searchkey: '',
      activeTime: 0,
      pageSize: 15,
      pageNum: 1,
      time: '',
      totalPage: 0,
      productId: '',
      bfrate: '',
      jjrate: '',
      yhrate: '',
      yzrate: '',
      yzList: [],
      zjList: [],
      jjgList: [],
      yhList: [],
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
            cursor: 'default',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
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
            cursor: 'default',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
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
            cursor: 'default',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            minAngle: 2, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            radius: [0, '40%'],
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
            radius: ['40%', '60%'],
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [],
            center: ['30%', '50%'],
            startAngle: 90
          }
        ]
      }
    }
  },
  watch: {
  },
  created() {
    this.activeTime = this.$route.query.tm
    this.fetchData()
    this.getProductOptions()
  },
  mounted() {
  },
  methods: {
    // 每页数量改变
    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    // 当前页数改变
    currentChange(pageNum) {
      this.pageNum = pageNum
      this.fetchData()
    },
    // 查询table
    fetchData() {
      const params = {
        days: this.activeTime,
        productId: this.productId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      productList(params).then(res => {
        this.list = res.data.list
        this.totalPage = res.data.total
      })
    },
    // 下拉框数据
    getProductOptions() {
      productOptions({}).then(res => {
        this.productOptions = res.data
      })
    },
    timeChanged(data) {
      console.log(data)
    },
    // 详情按钮
    handleDetails(row) {
      this.productName = row.name
      this.bfrate = row.bfrate
      this.jjrate = row.jjrate
      this.yhrate = row.yhrate
      this.yzrate = row.yzrate
      this.porductScrapVisible = true
      const params = {
        days: this.activeTime,
        productId: row.id
      }
      reason(params).then(res => {
        // 压铸报废构成
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
          this.castingOptions.series[0].radius = [0, '40%']
        } else {
          this.castingOptions.series[1].data = []
          this.castingOptions.series[0].radius = [0, '60%']
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
    }
  }
}

