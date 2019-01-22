
import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { getPlanConstuct, eqptParamsConstuct } from '@/api/report/contrast'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd },
  data() {
    return {
      listLoading: false,
      isContrast: false,
      order: '0',
      totaldaNum: '',
      totalRejectNum: '',
      totalRejectRatio: '',
      currentNav: 1,
      searchkey: '',
      pageSize: 15,
      pageNum: 1,
      time: '',
      totalPage: 0,
      firstColData: {
        eqptBSInfo: {
          eqptCode: '',
          eqptBrand: '',
          model: '',
          power: '',
          processTime: '',
          oee: ''
        },
        eqptDetail: {
          eqptCode: '',
          daNum: '',
          rejectNum: '',
          rejectatio: ''
        },
        planBsData: {},
        mouldReject: {
          mouldCode: '',
          daNum: '',
          rejectNum: '',
          rejectRatio: '',
          maintainCount: '',
          seriousMaintainCount: '',
          avgMaintainDay: ''
        }
      },
      secondColData: {
        eqptBSInfo: {
          eqptCode: '',
          eqptBrand: '',
          model: '',
          power: '',
          processTime: '',
          oee: ''
        },
        eqptDetail: {
          eqptCode: '',
          daNum: '',
          rejectNum: '',
          rejectatio: ''
        },
        planBsData: {},
        mouldReject: {
          mouldCode: '',
          daNum: '',
          rejectNum: '',
          rejectRatio: '',
          maintainCount: '',
          seriousMaintainCount: '',
          avgMaintainDay: ''
        }
      },
      eqptParams: [],
      currentId: ''
    }
  },
  watch: {
  },
  created() {
    this.totaldaNum = this.$route.query.jt
    this.totalRejectNum = this.$route.query.bt
    this.totalRejectRatio = this.$route.query.bl
    this.woCode1 = this.$route.query.c1
    if (this.$route.query.c2) {
      this.woCode2 = this.$route.query.c2
      this.isContrast = true
    }
    this.fetchData()
  },
  mounted() {
    // 先给页面注册滚动事件
    this.$refs.scrollBox.addEventListener('scroll', this.Scroll)
  },
  methods: {
    // 查询
    fetchData() {
      this.listLoading = true
      const params = {
        woCode1: this.woCode1,
        woCode2: this.woCode2
      }
      getPlanConstuct(params).then(res => {
        if (res.code === 0) {
          if (res.data.length === 2) {
            this.firstColData = res.data[0]
            this.secondColData = res.data[1]
          } else {
            this.firstColData = res.data[0]
          }
        }
      })
      eqptParamsConstuct(params).then(res => {
        this.eqptParams = res.data
      })
    },
    timeChanged(data) {
      console.log(data)
    },
    groupsChange(data) {
      console.log(data)
    },
    navClick(num) {
      switch (num) {
        case 1 : document.getElementById('jcxx').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
        case 2 : document.getElementById('yzjjcxx').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
        case 3 : document.getElementById('yzjcs').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
        case 4 : document.getElementById('yzjjgls').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
        case 5 : document.getElementById('mjjgls').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
        case 6 : document.getElementById('bfxx').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
          break
      }
    },
    // 滚动事件,如果不绑定到元素上，则只能监听页面滚动
    Scroll(e) {
      const jcxx = parseInt(window.getComputedStyle(this.$refs.jcxx).height)
      const yzjjcxx = parseInt(window.getComputedStyle(this.$refs.yzjjcxx).height)
      const yzjcs = parseInt(window.getComputedStyle(this.$refs.yzjcs).height)
      const yzjjgls = parseInt(window.getComputedStyle(this.$refs.yzjjgls).height)
      const mjjgls = parseInt(window.getComputedStyle(this.$refs.mjjgls).height)
      const scrollTop = this.$refs.scrollBox.scrollTop
      if (scrollTop === 0) {
        this.currentNav = 1
      }
      if (scrollTop > jcxx) {
        this.currentNav = 2
      }
      if (scrollTop > jcxx + yzjjcxx + 25) {
        this.currentNav = 3
      }
      if (scrollTop > jcxx + yzjjcxx + yzjcs + 50) {
        this.currentNav = 4
      }
      if (scrollTop > jcxx + yzjjcxx + yzjcs + yzjjgls + 75) {
        this.currentNav = 5
      }
      if (scrollTop > jcxx + yzjjcxx + yzjcs + yzjjgls + mjjgls + 100) {
        this.currentNav = 6
      }
    }
  }
}

