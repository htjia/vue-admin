import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { productList, eqptMouldRecommend, compScrapRateTrend } from '@/api/equipmentRecommend'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      isStart: true,
      productModelForm: {
        productModel: ''
      },
      productModelValue: '',
      productModelOptions: [],
      eqptCodeOptions: [],
      mouldCodeOptions: [],
      rules: {
        productModel: [
          { required: true, message: '请选择产品型号', trigger: 'change' }
        ]
      },
      chart: null,
      listLoading: false,
      workOrderId: '',
      searchTime: [],
      productModel: '',
      productionQuantity: '',
      list: [],
      pageSize: 15,
      pageNum: 1,
      searchkey: '',
      totalPage: 0,
      currentId: '',
      eqptId: '',
      trendEqptId: '',
      mouldId: '',
      trendMouldId: '',
      groupName: '',
      sortTpye: 0,
      sortBy: 0,
      options: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var result = '工单编号：' + params[0].name + '<br>'
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
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            nameTextStyle: {
              color: '#474747'
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
              margin: 20
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
            left: 30, // 左边的距离
            right: 20, // 右边的距离
            bottom: 20, // 右边的距离
            fillerColor: '#d3d3d3', // 选中范围的填充颜色。
            backgroundColor: '#f9f9f9', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            filterMode: 'filter'
          }
        ],
        yAxis: [
          {
            name: '报废率',
            type: 'value',
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
            name: '报废率',
            type: 'line',
            hoverAnimation: false,
            data: [11, 11, 15, 13, 12, 13, 10, 10, 10, 10, 10, 10, 10, 10]
          }
        ],
        grid: {
          x: 30,
          y: 30,
          x2: 20,
          y2: 40
        },
        color: ['#c5221f', '#87cefa', '#da70d6']
      }
    }
  },
  watch: {
  },
  created() {
    this.getProductList()
  },
  mounted() {
  },
  methods: {
    // 获取所有产品
    getProductList() {
      const params = {}
      productList(params).then(res => {
        this.productModelOptions = res.data
      })
    },
    // 设备推荐
    eqptMouldRecommendFun() {
      const params = {
        productId: this.productModelForm.productModel,
        eqptId: this.eqptId,
        mouldId: this.mouldId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortTpye: this.sortTpye,
        sortBy: this.sortBy
      }
      eqptMouldRecommend(params).then(res => {
        console.log(res.data)
        this.list = res.data.eqptMouldRecommends
        this.totalPage = res.data.size
        this.isStart = false
        this.trendEqptId = res.data.eqptMouldRecommends[0].eqptId
        this.trendMouldId = res.data.eqptMouldRecommends[0].mouldId
        this.groupName = res.data.eqptMouldRecommends[0].recommendGroup
        this.eqptCodeOptions = []
        this.mouldCodeOptions = []
        for (const item of res.data.eqptCode) {
          this.eqptCodeOptions.push({
            id: item,
            name: item
          })
        }
        for (const item of res.data.mouldCode) {
          this.mouldCodeOptions.push({
            id: item,
            name: item
          })
        }
        this.compScrapRateTrendFun()
      })
    },
    submitForm(formName) {
      if (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.eqptMouldRecommendFun()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.eqptMouldRecommendFun()
      }
    },
    compScrapRateTrendFun() {
      const params = {
        // productId: this.productModelForm.productModel,
        // eqptId: this.trendEqptId,
        // mouldId: this.trendMouldId
        productId: '1323',
        eqptId: '344',
        mouldId: '8192'
      }
      compScrapRateTrend(params).then(res => {
        var xAxisData = []
        var daNumArray = []
        for (const item of res.data) {
          xAxisData.push(item.woCode)
          daNumArray.push(item.rejectRatio)
        }
        this.options.xAxis[0].data = xAxisData
        this.options.series[0].data = daNumArray
        if (res.data.length > 30) {
          this.options.dataZoom[0].start = 100 - Math.floor(30 / res.data.length * 100)
          this.options.dataZoom[0].show = true
          this.options.xAxis.axisLabel.margin = 20
          this.options.grid.y2 = 35
        } else {
          this.options.dataZoom[0].show = false
          this.options.xAxis.axisLabel.margin = 10
          this.options.grid.y2 = 25
        }
      })
    },
    sortChange(column) {
      console.log(column)
      if (column.order === 'ascending') {
        this.sortTye = 0
      } else {
        this.sortTye = 1
      }
      if (column.prop === 'rejectatio') {
        this.sortBy = 1
      } else if (column.prop === 'daNum') {
        this.sortBy = 2
      } else {
        this.sortBy = 0
      }
      this.eqptMouldRecommendFun()
    },
    barClick(val) {
      console.log(val)
    },
    // 每页数量改变
    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.eqptMouldRecommendFun()
    },
    // 当前页数改变
    currentChange(pageNum) {
      this.pageNum = pageNum
      this.eqptMouldRecommendFun()
    },
    handleSearch(data) {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        workOrderId: this.workOrderId,
        startTime: this.searchTime[0],
        endTime: this.searchTime[1],
        productModel: this.productModel
      }
      this.fetchData(params)
    },
    rowClick(row) {
      this.trendEqptId = row.eqptId
      this.trendMouldId = row.mouldId
      this.groupName = row.recommendGroup
      this.compScrapRateTrendFun()
    }
  }
}
