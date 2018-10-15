import PageHeaderLayout from '@/components/PageHeaderLayout'
import { deptList, add, remove, update } from '@/api/department'
export default {
  components: { PageHeaderLayout },
  data() {
    const validateNodeName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else {
        if (value.length < 1) {
          callback(new Error('不能小于1位'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false,
      filterText: '',
      currentNode: '',
      list: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      nodeForm: {
        nodeName: ''
      },
      rules: {
        nodeName: [{ required: true, validator: validateNodeName, trigger: 'blur' }]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {
        // code: '',
        // name: ''
      }
      deptList(params).then(res => {
        if (res.code === 0) {
          this.list = res.data.child
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 搜索
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 添加根目录
    handleAdd() {
      this.nodeForm.nodeName = ''
      this.dialogVisible = true
    },
    // 添加按钮
    append(data) {
      this.nodeForm.nodeName = ''
      this.dialogVisible = true
      this.currentNode = data
    },
    // 添加fun
    addNode(id, name) {
      add(id, name).then(res => {
        this.fetchData()
      })
    },
    // 删除
    remove(data) {
      console.log(data.id)
      this.$confirm('此操作将永久删除该工厂, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(data.id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {
      })
    },
    // 修改按钮
    edit(data) {
      console.log(data)
      this.currentNode = data
      this.editDialogVisible = true
      this.nodeForm.nodeName = data.label
    },
    // 编辑 fun
    editNode(data, name) {
      update(data.mainId, name).then(res => {
        this.fetchData()
      })
    },
    // 查看详情
    viewDetail(data) {
      this.$router.push({ path: '/departmentDetail/index', query: { id: data.id }})
    },
    // 关闭
    handleClose(done) {
      done()
    },
    // 添加提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.currentNode) {
            this.addNode(this.currentNode.id, this.nodeForm.nodeName)
          } else {
            this.addNode('000', this.nodeForm.nodeName)
          }
          this.dialogVisible = false
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
          this.editNode(this.currentNode, this.nodeForm.nodeName)
          this.editDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.dialogVisible = false
      this.editDialogVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
