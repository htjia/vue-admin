import PageHeaderLayout from '@/components/PageHeaderLayout'
import HeaderSearchAdd from '@/components/HeaderSearchAdd'
import { asyncRouterMap } from '@/router'
import { roles, add, remove } from '@/api/roles'
export default {
  components: { PageHeaderLayout, HeaderSearchAdd },
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'))
      } else {
        if (value.length < 1) {
          callback(new Error('不能小于1位'))
        } else {
          callback()
        }
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色编码'))
      } else {
        if (value.length < 1) {
          callback(new Error('不能小于1位'))
        } else {
          callback()
        }
      }
    }
    return {
      routers: [],
      routerValues: [],
      checkAll: false,
      checkedRouters: ['department', 'departmentDetail'],
      isIndeterminate: true,
      listLoading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      permissionVisible: false,
      list: [],
      searchkey: '',
      pageSize: 15,
      pageNum: 1,
      totalPage: 0,
      name: '',
      roleForm: {
        roleName: '',
        nameCode: ''
      },
      rules: {
        roleName: [{ required: true, validator: validateName, trigger: 'blur' }],
        nameCode: [{ required: true, validator: validateCode, trigger: 'blur' }]
      },
      currentId: ''
    }
  },
  watch: {
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
    handleCheckAllChange(val) {
      this.checkedRouters = val ? this.routerValues : []
      this.isIndeterminate = false
    },
    handleCheckedRoutersChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.routers.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.routers.length
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
        searchkey: data
      }
      this.fetchData(params)
    },
    // 查询
    fetchData(params) {
      this.listLoading = true
      const requestParams = params || {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        searchkey: this.searchkey
      }
      roles(requestParams).then(res => {
        if (res.code === 0) {
          this.list = res.data.list
          this.totalPage = parseInt(res.data.total)
          this.listLoading = false
        }
      })
    },
    // 添加
    handleAdd() {
      this.roleForm.roleName = ''
      this.roleForm.nameCode = ''
      this.addDialogVisible = true
    },
    // 关闭
    handleClose(done) {
      done()
    },
    // 添加提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name: this.roleForm.nameCode,
            cnname: this.roleForm.roleName
          }
          add(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisible = false
              this.fetchData()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑提交
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name: this.roleForm.nameCode,
            cnname: this.roleForm.roleName,
            id: this.currentId
          }
          add(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.editDialogVisible = false
              this.fetchData()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.editDialogVisible = false
      this.addDialogVisible = false
      this.permissionVisible = false
      this.$refs[formName].resetFields()
    },
    // 编辑
    handleEdit(row) {
      this.currentId = row.id
      this.roleForm.roleName = row.cnname
      this.roleForm.nameCode = row.name
      this.editDialogVisible = true
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(row.id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.editDialogVisible = false
            this.fetchData()
          }
        })
      }).catch(() => {
      })
    },
    // 配置权限
    handPermission() {
      console.log(asyncRouterMap)
      const RouterMap = []
      asyncRouterMap.pop()
      for (const item of asyncRouterMap) {
        RouterMap.push({
          name: item.children[0].meta.title,
          value: item.path.substr(1)
        })
        this.routerValues.push(item.path.substr(1))
      }
      this.permissionVisible = true
      this.routers = RouterMap
    },
    // 权限配置提交
    submitPermissionForm() {
      console.log(this.checkedRouters)
    }
  }
}
