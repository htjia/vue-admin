import PageHeaderLayout from '@/components/PageHeaderLayout'
import { logList } from '@/api/uploadLog'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, Chart },
  data() {
    return {
      listLoading: false,
      tableName: '',
      uploadState: '',
      equipment: '1',
      forecastTime: '',
      // 柱状图
      equipmentOptions: [
        {
          value: '1',
          label: '设备1'
        },
        {
          value: '6',
          label: '设备1'
        },
        {
          value: '7',
          label: '设备1'
        },
        {
          value: '8',
          label: '设备1'
        },
        {
          value: '9',
          label: '设备1'
        }
      ],
      list: [],
      lists: [{}, {}, {}, {}, {}],
      pageSize: 10,
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
          formatter: function(params) {
            let outcome = ''
            if (params.value === -1) {
              outcome = '预测失败'
            } else {
              outcome = '预测成功'
            }
            return params.name + '<br/> ' + params.value + ' (' + outcome + ')'
          }
        },
        dataZoom: [
          {
            start: 0, // 默认为0
            end: 60,
            type: 'slider', // slider 表示有滑动块的，inside表示内置的
            show: true, // 如果为false 则不显示
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 12, // 组件高度
            left: 30, // 左边的距离
            right: 5, // 右边的距离
            bottom: 20, // 右边的距离
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
        xAxis: {
          type: 'category',
          data: ['11.11(早)', '11.11(中)', '11.11(晚)', '11.12(早)', '11.12(中)', '11.12(晚)', '11.13(早)', '11.11(中)', '11.11(晚)', '11.12(早)', '11.12(中)', '11.12(晚)', '11.13(早)'],
          axisLabel: {
            margin: 15,
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        series: [{
          name: '123',
          data: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1],
          type: 'bar',
          barMaxWidth: 15, // 最大宽度
          itemStyle: {
            normal: {
              color: function(params) {
                var index_color = params.value
                if (index_color >= 0) {
                  return '#de525f'
                } else {
                  return '#009494'
                }
              }
            }
          }
        }],
        grid: {
          x: 30,
          y: 21,
          x2: 40,
          y2: 40
        }
      },
      outcomeOptions: {
        tooltip: {
          formatter: '{b} <br/> {c}%'
        },
        series: [
          {
            name: '预测结果',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 88.6, name: '预测成功率' }],
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            splitLine: { // 分割线样式
              length: 10
            },
            radius: '100%',
            axisTick: {
              length: 5
            }
          }
        ]
      },
      scrappageOptions: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: ['2018-11-1', '2018-11-2', '2018-11-3', '2018-11-4', '2018-11-5', '2018-11-6', '2018-11-7', '2018-11-8', '2018-11-9', '2018-11-10', '2018-11-11', '2018-11-12', '2018-11-13', '2018-11-14'],
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
        yAxis: [
          {
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
            },
            axisLabel: {
              show: true,
              margin: 15
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
          y: 21,
          x2: 40,
          y2: 40
        },
        color: ['#ff7f50', '#87cefa', '#da70d6']
      }
    }
  },
  watch: {
  },
  created() {
    const params = {
      pageNum: 1,
      pageSize: 10,
      searchkey: ''
    }
    this.fetchData(params)
  },
  mounted() {
    console.log(this.$route.query.id)
  },
  methods: {
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
      // const params = {
      //   pageSize: this.pageSize,
      //   pageNum: this.pageNum,
      //   tableName: this.tableName,
      //   uploadState: this.uploadState
      // }
      // this.fetchData(params)
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
    // 前一天
    before() {
      console.log('前一天')
    },
    // 后一天
    after() {
      console.log('后一天')
    }
  }
}
