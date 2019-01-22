import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { queryEquipment, queryProduct, queryMould, rawList, eqptParam } from '@/api/parameterRecommend'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      isStart: true,
      isLoading: false,
      disabledSelect: true,
      productModelForm: {
        eqptType: '', // 设备
        productType: '', // 产品
        mouldType: '', // 模具型号
        materialsType: '' // 材料
      },
      productModelValue: '',
      equipmentOptions: [],
      productOptions: [],
      mouldOptions: [],
      materialsOptions: [],
      rules: {
        eqptType: [
          { required: true, message: '请选择设备型号', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择产品型号', trigger: 'blur' }
        ],
        mouldType: [
          { required: true, message: '请选择模具型号', trigger: 'blur' }
        ],
        materialsType: [
          { required: true, message: '请选择材料', trigger: 'blur' }
        ]
      },
      listLoading: false,
      tableName: '',
      searchTime: [],
      uploadState: '',
      infoList: [],
      list: [],
      lists: [{}],
      listss: [{}],
      pageSize: 10,
      pageNum: 1,
      searchkey: '',
      totalPage: 0,
      currentId: '',
      flag: true,
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
          data: ['一速速度不足', '料饼厚度不足', '炉温异常', '料厚度不足', '其他']
        },
        series: [
          {
            name: '异常分析',
            type: 'pie',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            radius: ['50%', '70%'],
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
    productType(newValue, oldValue) {
      console.log(newValue)
      this.productModelForm.mouldType = []
      this.productModelForm.materialsType = []
      if (newValue.length !== 0) {
        this.disabledSelect = false
        // 获取产品对应的模具
        this.mouldInfo(newValue)
        // 获取产品对应的材料
        this.materialsInfo(newValue)
      } else {
        this.disabledSelect = true
      }
    }
  },
  created() {
    this.equipmentInfo()
    this.productInfo()
  },
  computed: {
    productType() {
      return this.productModelForm.productType
    }
  },
  mounted() {
  },
  methods: {
    // 获取所有设备
    equipmentInfo() {
      queryEquipment({}).then(res => {
        if (res.code === 0) {
          this.equipmentOptions = res.data
        }
      })
    },
    // 获取所有产品
    productInfo() {
      queryProduct({}).then(res => {
        if (res.code === 0) {
          this.productOptions = res.data
        }
      })
    },
    // 获取产品对应的模具
    mouldInfo(productId) {
      const params = {
        productId: productId
      }
      queryMould(params).then(res => {
        this.mouldOptions = res.data
      })
    },
    // 获取产品对应的材料
    materialsInfo(productId) {
      const params = {
        productId: productId
      }
      rawList(params).then(res => {
        this.materialsOptions = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true
          const params = {
            productId: this.productModelForm.productType,
            eqptId: this.productModelForm.eqptType,
            mouldId: this.productModelForm.mouldType,
            rawId: this.productModelForm.materialsType
          }
          eqptParam(params).then(res => {
            this.isLoading = false
            this.isStart = false
            this.infoList = []
            this.infoList.push({
              power: res.data.power,
              eqptBrand: res.data.eqptBrand,
              eqptTpye: res.data.eqptTpye,
              modelId: res.data.modelId
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
    clearSearch() {
      this.productModelForm.eqptType = []
      this.productModelForm.productType = []
      this.productModelForm.mouldType = []
      this.productModelForm.materialsType = []
    },
    clearSearchOut() {
      this.clearSearch()
      // this.submitForm('productModelFormOut')
    },
    clearSearchIn() {
      this.clearSearch()
      // this.$refs.productModelFormIn.resetFields()
      // this.submitForm('productModelFormIn')
    },
    // 东阳设定参数推荐
    DYrenderHeader1(h) {
      return [h('p', {}, ['低速3速度']), h('p', {}, ['m/s'])]
    },
    DYrenderHeader2(h) {
      return [h('p', {}, ['低速2速度']), h('p', {}, ['m/s'])]
    },
    DYrenderHeader3(h) {
      return [h('p', {}, ['低速1速度']), h('p', {}, ['m/s'])]
    },
    DYrenderHeader4(h) {
      return [h('p', {}, ['高速速度']), h('p', {}, ['m/s'])]
    },
    DYrenderHeader5(h) {
      return [h('p', {}, ['增压启动']), h('p', {}, ['ms'])]
    },
    DYrenderHeader6(h) {
      return [h('p', {}, ['冷却时间']), h('p', {}, ['s'])]
    },
    DYrenderHeader7(h) {
      return [h('p', {}, ['料饼厚度']), h('p', {}, ['mm'])]
    },
    DYrenderHeader8(h) {
      return [h('p', {}, ['一个铸造循环时间']), h('p', {}, ['s'])]
    },
    // 东芝设定参数推荐
    DZrenderHeader1(h) {
      return [h('p', {}, ['低速阀刻度回转']), h('p', {}, ['m/s'])]
    },
    DZrenderHeader2(h) {
      return [h('p', {}, ['高速阀刻度回转']), h('p', {}, ['m/s'])]
    },
    DZrenderHeader3(h) {
      return [h('p', {}, ['增压阀刻度回转']), h('p', {}, ['m/s'])]
    },
    DZrenderHeader4(h) {
      return [h('p', {}, ['高速开始']), h('p', {}, ['mm'])]
    },
    DZrenderHeader5(h) {
      return [h('p', {}, ['空打位置']), h('p', {}, ['mm'])]
    },
    DZrenderHeader6(h) {
      return [h('p', {}, ['射出前进限位置']), h('p', {}, ['mm'])]
    },
    DZrenderHeader7(h) {
      return [h('p', {}, ['射出后退时间']), h('p', {}, ['s'])]
    },
    DZrenderHeader8(h) {
      return [h('p', {}, ['合模时间']), h('p', {}, ['s'])]
    },
    DZrenderHeader9(h) {
      return [h('p', {}, ['料饼厚度']), h('p', {}, ['mm'])]
    },
    DZrenderHeader10(h) {
      return [h('p', {}, ['一个铸造循环时间']), h('p', {}, ['s'])]
    },
    // 东芝-H设定参数推荐
    DZHrenderHeader1(h) {
      return [h('p', {}, ['低速速度']), h('p', {}, ['m/s'])]
    },
    DZHrenderHeader2(h) {
      return [h('p', {}, ['高速速度']), h('p', {}, ['m/s'])]
    },
    DZHrenderHeader3(h) {
      return [h('p', {}, ['升压时间']), h('p', {}, ['s'])]
    },
    // 东阳监控参数推荐
    DYmonitorHeader1(h) {
      return [h('p', {}, ['1速速度']), h('p', {}, ['m/s'])]
    },
    DYmonitorHeader2(h) {
      return [h('p', {}, ['2速速度']), h('p', {}, ['m/s'])]
    },
    DYmonitorHeader3(h) {
      return [h('p', {}, ['3速速度']), h('p', {}, ['m/s'])]
    },
    DYmonitorHeader4(h) {
      return [h('p', {}, ['高速速度']), h('p', {}, ['m/s'])]
    },
    DYmonitorHeader5(h) {
      return [h('p', {}, ['铸造压力']), h('p', {}, ['Mpa'])]
    },
    DYmonitorHeader6(h) {
      return [h('p', {}, ['料头厚']), h('p', {}, ['mm'])]
    },
    DYmonitorHeader7(h) {
      return [h('p', {}, ['增压启动时间']), h('p', {}, ['s'])]
    },
    DYmonitorHeader8(h) {
      return [h('p', {}, ['周期时间']), h('p', {}, ['s'])]
    },
    DYmonitorHeader9(h) {
      return [h('p', {}, ['关模力']), h('p', {}, ['Ton'])]
    },
    // 东芝监控参数推荐
    DZmonitorHeader1(h) {
      return [h('p', {}, ['循环时间']), h('p', {}, ['s'])]
    },
    DZmonitorHeader2(h) {
      return [h('p', {}, ['低速速度']), h('p', {}, ['m/s'])]
    },
    DZmonitorHeader3(h) {
      return [h('p', {}, ['高速速度']), h('p', {}, ['m/s'])]
    },
    DZmonitorHeader4(h) {
      return [h('p', {}, ['高速开始']), h('p', {}, ['mm'])]
    },
    DZmonitorHeader5(h) {
      return [h('p', {}, ['高速区间']), h('p', {}, ['mm'])]
    },
    DZmonitorHeader6(h) {
      return [h('p', {}, ['料饼厚度']), h('p', {}, ['mm'])]
    },
    DZmonitorHeader7(h) {
      return [h('p', {}, ['铸造压力']), h('p', {}, ['Mpa'])]
    },
    DZmonitorHeader8(h) {
      return [h('p', {}, ['升压时间']), h('p', {}, ['s'])]
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
    }
  }
}
