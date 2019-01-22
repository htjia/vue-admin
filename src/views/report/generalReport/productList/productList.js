
import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { everyOneReject } from '@/api/report/product'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd },
  data() {
    return {
      listLoading: false,
      list: [],
      productOptions: [],
      searchkey: '',
      pageSize: 15,
      pageNum: 1,
      time: '',
      totalPage: 0,
      currentId: '',
      timeFame: '',
      beginTime: '',
      endTime: '',
      productId: '',
      productForm: {
        product: ''
      },
      rules: {
        product: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
  },
  created() {
    this.timeFame = this.$route.query.tm
    this.beginTime = this.$route.query.st
    this.endTime = this.$route.query.et
    this.fetchData()
    this.getOptions()
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
    // 清空选中项
    clearSelected(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    // 搜索
    submitForm(formName) {
      console.log(this.productForm.product)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 查询
    fetchData() {
      this.listLoading = true
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        productId: this.productForm.product,
        timeFame: this.timeFame
      }
      everyOneReject(params).then(res => {
        if (res.code === 0) {
          this.listLoading = false
          this.list = res.data.list
          this.totalPage = res.data.total
        }
      })
    },
    getOptions() {
      const params = {
        pageSize: 10000,
        pageNum: this.pageNum,
        productId: '',
        timeFame: this.timeFame
      }
      everyOneReject(params).then(res => {
        if (res.code === 0) {
          for (const item of res.data.list) {
            this.productOptions.push({
              name: `${item.productName}/${item.productCode}`,
              id: item.productId
            })
          }
        }
      })
    },
    timeChanged(data) {
      console.log(data)
    },
    // 详情按钮跳转
    handleDetails(row) {
      this.$router.push({ path: '/routine/productDetail', query: { id: row.productId, tm: this.timeFame }})
    }
  }
}

