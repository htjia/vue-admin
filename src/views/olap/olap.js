import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { queryEquipment, queryProduct, queryMould, integratedQuery } from '@/api/report/olap'
import Chart from '@/components/Charts'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd, Chart },
  data() {
    return {
      isStart: true,
      isLoading: false,
      productModelForm: {
        time: '',
        unitType: '',
        productModel: '',
        patternType: '' // 模具型号
      },
      productModelValue: '',
      equipmentOptions: [],
      productOptions: [],
      moduleOptions: [],
      rules: {
        time: [
          { required: true, message: '请选择时间范围', trigger: 'change' }
        ],
        unitType: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        productModel: [
          { required: true, message: '请选择产品型号', trigger: 'change' }
        ],
        patternType: [
          { required: true, message: '请选择模具型号', trigger: 'change' }
        ]
      },
      listLoading: false,
      isDisabled: true,
      disabledSelect: true,
      tableName: '',
      searchTime: [],
      uploadState: '',
      list: [],
      pageSize: 15,
      pageNum: 1,
      searchkey: '',
      totalPage: 0,
      currentId: '',
      flag: true,
      screenHeight: document.body.clientHeight,
      searchCtnHeight: '',
      spanArr: [],
      oldOptions: [],
      oldProductOptions: [],
      oldModuleOptions: [],
      pos: '',
      groups: '0'
    }
  },
  watch: {
    productModel(newValue, oldValue) {
      console.log(newValue)
      this.productModelForm.patternType = []
      if (newValue.length !== 0) {
        this.disabledSelect = false
        // 获取所有的模具
        this.mouldInfo(newValue)
      } else {
        this.disabledSelect = true
      }
    }
  },
  created() {
    // const params = {
    //   pageNum: 1,
    //   pageSize: 10,
    //   searchkey: ''
    // }
    // this.fetchData(params)
  },
  computed: {
    productModel() {
      return this.productModelForm.productModel
    }
    // olapContainerHeight: function() {
    //   // 这里的this指向的是当前的vue实例
    //   return this.screenHeight - this.searchCtnHeight - 137 + 'px'
    // }
  },
  mounted() {
    this.$refs.productModelFormOut.resetFields()
    this.getSpanArr(this.list, 'time')
    this.equipmentInfo()
    this.productInfo()
    // this.searchCtnHeight = this.$refs.searchCtn.offsetHeight
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     window.screenHeight = document.body.clientHeight
    //     that.screenHeight = window.screenHeight
    //   })()
    // }
  },
  methods: {
    // 生成一个与行数相同的数组记录每一行设置的合并数
    getSpanArr(data, groups) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1) // 用于存放每一行记录的合并数
          this.pos = 0 // pos是spanArr的索引
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i][groups] === data[i - 1][groups]) { // 则向spanArr中添入元素０，并将前一位元素＋１，表示合并行数＋１
            this.spanArr[this.pos] += 1
            this.spanArr.push(0) // 0 即表示该行不显示
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    groupsChange() {
      console.log(this.groups)
      this.fetchData()
    },
    timeChanged(val) {
      console.log(val)
    },
    clearSearch() {
      this.productModelForm.time = []
      this.productModelForm.unitType = []
      this.productModelForm.productModel = []
      this.productModelForm.patternType = []
    },
    clearSearchOut() {
      this.clearSearch()
      this.submitForm('productModelFormOut')
    },
    clearSearchIn() {
      this.clearSearch()
      // this.$refs.productModelFormIn.resetFields()
      this.submitForm('productModelFormIn')
    },
    eqptChangeSelect(val) {
      const allValues = []
      // 保留所有值
      for (const item of this.equipmentOptions) {
        allValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []
      // 若是全部选择
      if (val.includes('ALL_SELECT')) { this.productModelForm.unitType = ['ALL_SELECT'] }
      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) this.productModelForm.unitType = []
      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT')
        val.splice(index, 1) // 排除全选选项
        this.productModelForm.unitType = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) this.productModelForm.unitType = ['ALL_SELECT'].concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[0] = this.productModelForm.unitType
      console.log(this.productModelForm.unitType)
    },
    productChangeSelect(val) {
      console.log(val)
      const allValues = []
      // 保留所有值
      for (const item of this.productOptions) {
        allValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldProductOptions.length === 1 ? this.oldProductOptions[0] : []
      // 若是全部选择
      if (val.includes('ALL_SELECT')) { this.productModelForm.productModel = ['ALL_SELECT'] }
      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) this.productModelForm.productModel = []
      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT')
        val.splice(index, 1) // 排除全选选项
        this.productModelForm.productModel = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) this.productModelForm.productModel = ['ALL_SELECT'].concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldProductOptions[0] = this.productModelForm.productModel
    },
    modelChangeSelect(val) {
      const allValues = []
      // 保留所有值
      for (const item of this.moduleOptions) {
        allValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldModuleOptions.length === 1 ? this.oldModuleOptions[0] : []
      // 若是全部选择
      if (val.includes('ALL_SELECT')) { this.productModelForm.patternType = ['ALL_SELECT'] }
      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) this.productModelForm.patternType = []
      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT')
        val.splice(index, 1) // 排除全选选项
        this.productModelForm.patternType = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) this.productModelForm.patternType = ['ALL_SELECT'].concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldModuleOptions[0] = this.productModelForm.patternType
      console.log(this.productModelForm.patternType)
    },
    // 获取所有设备
    equipmentInfo() {
      queryEquipment({}).then(res => {
        if (res.code === 0) {
          this.equipmentOptions = res.data
          if (this.equipmentOptions.length > 0) {
            this.equipmentOptions.unshift({
              id: 'ALL_SELECT',
              name: '全部'
            })
          }
        }
      })
    },
    // 获取所有产品
    productInfo() {
      queryProduct({}).then(res => {
        if (res.code === 0) {
          this.productOptions = res.data
          if (this.productOptions.length > 0) {
            this.productOptions.unshift({
              id: 'ALL_SELECT',
              name: '全部'
            })
          }
        }
      })
    },
    // 获取所有模具
    mouldInfo(productIdList) {
      let productIds = ''
      if (productIdList[0] !== 'ALL_SELECT') {
        productIds = productIdList.join(',')
      }
      const params = {
        productId: productIds
      }
      queryMould(params).then(res => {
        this.moduleOptions = res.data
        if (this.moduleOptions.length > 0) {
          this.moduleOptions.unshift({
            id: 'ALL_SELECT',
            code: '全部'
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // validateFun() {
    //   this.$refs.productModelFormIn.validate((valid) => {
    //     if (!valid) {
    //       this.isDisabled = true
    //     }
    //   })
    // },
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
    // 查询
    fetchData() {
      if (this.isStart) {
        this.isLoading = true
      }
      this.listLoading = true
      var eqptIds = ''
      var materialIds = ''
      var modelIds = ''
      if (this.productModelForm.unitType[0] !== 'ALL_SELECT') {
        eqptIds = this.productModelForm.unitType.join(',')
      }
      if (this.productModelForm.productModel[0] !== 'ALL_SELECT') {
        materialIds = this.productModelForm.productModel.join(',')
      }
      if (this.productModelForm.patternType[0] !== 'ALL_SELECT') {
        modelIds = this.productModelForm.patternType.join(',')
      }
      var params = {
        startTime: this.productModelForm.time[0],
        endTime: this.productModelForm.time[1],
        eqptId: eqptIds,
        materialId: materialIds,
        modelId: modelIds,
        groupTag: this.groups,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      console.log(params.eqptId)
      integratedQuery(params).then(res => {
        if (res.code === 0) {
          this.isStart = false
          this.isLoading = false
          this.isDisabled = false
          this.list = res.data.list
          this.totalPage = parseInt(res.data.total)
          switch (this.groups) {
            case '0' : this.getSpanArr(this.list, 'dataTime')
              break
            case '1' : this.getSpanArr(this.list, 'eqptName')
              break
            case '2' : this.getSpanArr(this.list, 'materialName')
              break
          }
          this.listLoading = false
        }
      })
    }
  }
}
