
import PageHeaderLayout from '@/components/PageHeaderLayout'
import { getList, add, update, remove, updatePwd, configInfo } from '@/api/user'
import { deptList } from '@/api/department'
import { postList } from '@/api/post'
import { roles } from '@/api/roles'
import axios from 'axios'
export default {
  components: { PageHeaderLayout },
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (value.length > 15) {
          callback(new Error('不能大于15位'))
        } else {
          callback()
        }
      }
    }
    const validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length > 6) {
          callback(new Error('不能大于6位'))
        } else {
          callback()
        }
      }
    }
    const validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.passwordForm.newPwd === value) {
          callback(new Error('新旧密码不能相同'))
        } else {
          callback()
        }
      }
    }
    const validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.passwordForm.oldPwd === value) {
          callback(new Error('新旧密码不能相同'))
        } else {
          callback()
        }
      }
    }
    const validateDept = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }
    return {
      listLoading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      updatePwdDialogVisible: false,
      configDialogVisible: false,
      list: [],
      postOptions: [],
      roleOptions: [],
      deptList: [],
      username: '',
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      treeData: [],
      searchkey: '',
      pageSize: 10,
      pageNum: 1,
      totalPage: 0,
      name: '',
      userForm: {
        userName: '',
        passWord: ''
      },
      passwordForm: {
        oldPwd: '',
        newPwd: ''
      },
      configForm: {
        post: '',
        role: '',
        dept: ''
      },
      configRules: {
        post: [{ required: true, message: '请选择岗位', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        dept: [{ required: true, validator: validateDept, trigger: 'blur' }]
      },
      passwordRules: {
        oldPwd: [{ required: true, validator: validateOldPwd, trigger: 'blur' }],
        newPwd: [{ required: true, validator: validateNewPwd, trigger: 'blur' }]
      },
      rules: {
        userName: [{ required: true, validator: validateName, trigger: 'blur' }],
        passWord: [{ required: true, validator: validatePassWord, trigger: 'blur' }]
      },
      currentId: ''
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
    this.getDeptList()
    this.getPostList()
    this.getRoleList()
  },
  methods: {
    getDeptList() {
      deptList().then(res => {
        if (res.code === 0) {
          this.treeData = res.data.child
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    getPostList() {
      const requestParams = {
        pageSize: 1000,
        pageNum: 1,
        name: ''
      }
      postList(requestParams).then(res => {
        if (res.code === 0) {
          this.postOptions = res.data.list
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    getRoleList() {
      const requestParams = {
        pageSize: 1000,
        pageNum: 1,
        searchkey: ''
      }
      roles(requestParams).then(res => {
        if (res.code === 0) {
          this.roleOptions = res.data.list
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
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
    // 查询
    fetchData(params) {
      this.listLoading = true
      const requestParams = params || {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        searchkey: this.searchkey
      }
      getList(requestParams).then(res => {
        if (res.code === 0) {
          this.list = res.data.list
          this.totalPage = parseInt(res.data.total)
          this.listLoading = false
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 添加
    handleAdd() {
      this.userForm.userName = ''
      this.userForm.passWord = ''
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
            password: this.userForm.passWord,
            username: this.userForm.userName
          }
          add(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisible = false
              this.fetchData()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
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
            username: this.userForm.userName,
            id: this.currentId
          }
          update(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.editDialogVisible = false
              this.fetchData()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改密码确认
    submitPawForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            oldPassword: this.passwordForm.oldPwd,
            newPassword: this.passwordForm.newPwd,
            userId: this.currentId
          }
          updatePwd(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.updatePwdDialogVisible = false
              this.fetchData()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 配置确认
    submitConfigForm(formName) {
      this.configForm.dept = this.$refs.tree.getCheckedKeys()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const role = []
          const post = []
          const dept = []
          for (const item of this.configForm.role) {
            role.push({
              id: item
            })
          }
          for (const item of this.configForm.post) {
            post.push({
              id: item
            })
          }
          for (const item of this.$refs.tree.getCheckedKeys()) {
            dept.push({
              id: item
            })
          }
          const params = {
            listDepartment: dept,
            listStation: post,
            listRole: role,
            sysUser: {
              id: this.currentId,
              username: this.username
            }
          }
          axios.post(`${process.env.BASE_API}/user/SaveUserDetail`, params, { headers: { 'Content-Type': 'application/json' }})
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '配置成功!'
                })
                this.configDialogVisible = false
                this.fetchData()
              }
            })
            .catch(err => {
              console.log(err)
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
      this.updatePwdDialogVisible = false
      this.addDialogVisible = false
      this.configDialogVisible = false
      this.$refs[formName].resetFields()
    },
    // 编辑
    handleEdit(row) {
      this.currentId = row.id
      this.userForm.userName = row.username
      this.editDialogVisible = true
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
    // 修改密码
    handleUpdatePwd(row) {
      this.currentId = row.id
      this.updatePwdDialogVisible = true
      this.passwordForm.oldPwd = ''
      this.passwordForm.newPwd = ''
    },
    // 配置
    handleConfig(row) {
      this.configForm.post = []
      this.configForm.role = []
      this.checkedKeys = []
      this.currentId = row.id
      this.username = row.username
      this.configDialogVisible = true
      configInfo(row.id).then(res => {
        if (res.code === 0) {
          const post = []
          const role = []
          const dept = []
          for (const item of res.data.listStation) {
            post.push(item.id)
          }
          for (const item of res.data.listRole) {
            role.push(item.id)
          }
          for (const item of res.data.listDepartment) {
            dept.push(item.id)
          }
          this.configForm.post = post
          this.configForm.role = role
          this.$refs.tree.setCheckedKeys(dept)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  }
}

