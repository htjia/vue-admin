import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { logList } from '@/api/uploadLog'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      chart: null,
      listLoading: false,
      workOrderId: '',
      isUnfolded: false,
      mouldIsUnfolded: false,
      searchTime: [],
      productModel: '',
      productionQuantity: '',
      lists: [{}, {}, {}, {}, {}],
      listss: [{}, {}, {}, {}, {}],
      pageSize: 15,
      pageNum: 1,
      searchkey: '',
      totalPage: 0,
      tokenForm: {
        tokenId: '',
        name: '',
        password: ''
      },
      rules: {
        tokenId: [{ required: true, message: 'id不能为空', trigger: 'blur' }],
        name: [{ required: true, message: 'name不能为空', trigger: 'blur' }],
        password: [{ required: true, message: 'password不能为空', trigger: 'blur' }]
      },
      currentId: '',
      options: {
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
        },
        calculable: false,
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: 'rgb(174, 174, 174)',
                width: 1
              },
              show: true
            },
            axisTick: {
              show: true,
              inside: true,
              length: 5,
              lineStyle: {
                color: 'rgb(174, 174, 174)'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#666'
              }
            }
            // minInterval: 1 // 解决问题：实际上的统计信息，其数据都是整数，没有小数。所以希望图形中的刻度也不要出现小数；
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['13#', '14#', '17#', '4#', '2#', '1#'],
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgb(174, 174, 174)',
                width: 1
              }
            },
            axisLabel: {
              margin: 15,
              textStyle: {
                color: '#666'
              }
              // formatter: '{value} 包'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgb(215, 215, 215)'
              },
              show: true
            }
          }
        ],
        series: [
          {
            name: '报废率',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7',
                    '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688',
                    '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7',
                    '#009688', '#7586b7', '#009688', '#7586b7', '#009688', '#7586b7'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            },

            // 设置柱的宽度，要是数据太少，柱子太宽不美观~

            barWidth: 20, // 柱子宽度
            barGap: '0', // 柱子间距离
            barCategoryGap: '200%',
            data: [0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
          }
        ],
        // color: ['rgb(51, 169, 169)'],
        animation: true,
        animationEasing: 'ElasticInOut',
        grid: {
          x: 50,
          y: 20,
          x2: 30,
          y2: 40
        }
      }
    }
  },
  watch: {
    isUnfolded(newV, oldV) {
      if (newV) {
        this.lists = [
          {}, {}, {}, {}, {}, {}, {}, {}, {}
        ]
      } else {
        this.lists = [
          {}, {}, {}, {}, {}
        ]
      }
      this.$refs.moduleContentLeft.style.height = 44 + this.lists.length * 42 + 'px'
      this.$refs.equipmentChart.onResize()
    },
    mouldIsUnfolded(newV, oldV) {
      if (newV) {
        this.listss = [
          {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ]
      } else {
        this.listss = [
          {}, {}, {}, {}, {}
        ]
      }
      this.$refs.moduleContentLeft2.style.height = 45 + this.listss.length * 42 + 'px'
      this.$refs.equipmentChart2.onResize()
    }
  },
  created() {
    const params = {
      pageNum: 1,
      pageSize: 15,
      searchkey: ''
    }
    this.fetchData(params)
  },
  mounted() {
  },
  methods: {
    barClick(val) {
      console.log(val)
    },
    // 每页数量改变
    sizeChange(pageSize) {
      const params = {
        pageNum: this.pageNum,
        pageSize
      }
      this.pageSize = pageSize
      this.fetchData(params)
    },
    // 当前页数改变
    currentChange(pageNum) {
      const params = {
        pageSize: this.pageSize,
        pageNum
      }
      this.pageNum = pageNum
      this.fetchData(params)
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
    // 查询
    fetchData(params) {
      this.listLoading = true
      const requestParams = params || {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      logList(requestParams).then(res => {
        if (res.code === 0) {
          this.list = res.data.list
          this.totalPage = parseInt(res.data.total)
          this.listLoading = false
        }
      })
    },
    // 展开按钮
    handleUnfold() {
      console.log(this.isUnfolded)
      this.isUnfolded = !this.isUnfolded
    },
    handleMouldUnfold() {
      console.log(this.mouldIsUnfolded)
      this.mouldIsUnfolded = !this.mouldIsUnfolded
    }
  }
}
