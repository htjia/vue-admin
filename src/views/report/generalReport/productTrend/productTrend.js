
import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { productEverydayTrend } from '@/api/report/product'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd },
  data() {
    return {
      listLoading: false,
      list: [],
      searchkey: '',
      beginTime: '',
      endTime: '',
      pageSize: 15,
      pageNum: 1,
      time: [],
      totalPage: 0,
      currentId: ''
    }
  },
  watch: {
  },
  created() {
    this.beginTime = this.$route.query.st
    this.endTime = this.$route.query.et
    this.time.push(this.beginTime)
    this.time.push(this.endTime)
    this.productEverydayTrendFun()
  },
  mounted() {
  },
  methods: {
    // 每页数量改变
    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.productEverydayTrendFun()
    },
    // 当前页数改变
    currentChange(pageNum) {
      this.pageNum = pageNum
      this.productEverydayTrendFun()
    },
    handleSearch(data) {
      this.productEverydayTrendFun()
    },
    // 查询
    productEverydayTrendFun() {
      this.listLoading = true
      const params = {
        beginTime: this.time[0],
        endTime: this.time[1],
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      productEverydayTrend(params).then(res => {
        if (res.code === 0) {
          this.listLoading = false
          console.log(res)
          this.list = res.data.list
          this.totalPage = res.data.total
        }
      })
    },
    timeChanged(data) {
      console.log(data)
    }
  }
}

