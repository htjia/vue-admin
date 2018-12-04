import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { logList } from '@/api/uploadLog'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      listLoading: false,
      tableName: '',
      searchTime: [],
      uploadState: '',
      list: [],
      lists: [{}],
      listss: [{}, {}],
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
      flag: true,
      abnormalOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '70%',
          y: 'center',
          // orient: 'vertical',  //垂直显示
          // y: 'center',    //延Y轴居中
          // x: 'right' //居右显示
          data: ['一速速度不足', '料饼厚度不足', '炉温异常', '料厚度不足', '其他']
        },
        series: [
          {
            name: '异常分析',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
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
              { value: 335, name: '一速速度不足' },
              { value: 310, name: '料饼厚度不足' },
              { value: 234, name: '炉温异常' },
              { value: 135, name: '料厚度不足' },
              { value: 1548, name: '其他' }
            ],
            center: ['35%', '50%']
          }
        ]
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
  },
  methods: {
    btnClick() {
      this.abnormalOptions.series[0].data = [
        { value: 33, name: '一速速度不足' },
        { value: 10, name: '料饼厚度不足' },
        { value: 34, name: '炉温异常' },
        { value: 35, name: '料厚度不足' },
        { value: 48, name: '其他1' }
      ]
      this.abnormalOptions.legend.data = ['一速速度不足', '料饼厚度不足', '炉温异常', '料厚度不足', '其他1']
    },
    renderHeader1(h) {
      return [h('p', {}, ['ACC压力']), h('p', {}, ['Mpa'])]
    },
    renderHeader2(h) {
      return [h('p', {}, ['低速速度']), h('p', {}, ['m/s'])]
    },
    renderHeader3(h) {
      return [h('p', {}, ['高速速度']), h('p', {}, ['m/s'])]
    },
    renderHeader4(h) {
      return [h('p', {}, ['升压时间']), h('p', {}, ['ms'])]
    },
    renderHeader5(h) {
      return [h('p', {}, ['高速开始']), h('p', {}, ['mm'])]
    },
    renderHeader6(h) {
      return [h('p', {}, ['空打位置']), h('p', {}, ['mm'])]
    },
    renderHeader7(h) {
      return [h('p', {}, ['射出前进限位置']), h('p', {}, ['mm'])]
    },
    renderHeader8(h) {
      return [h('p', {}, ['射出后退时间']), h('p', {}, ['s'])]
    },
    renderHeader9(h) {
      return [h('p', {}, ['合模时间']), h('p', {}, ['s'])]
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
        tableName: this.tableName,
        startTime: this.searchTime[0],
        endTime: this.searchTime[1],
        uploadState: this.uploadState
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
    }
  }
}
