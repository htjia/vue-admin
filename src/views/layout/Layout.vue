<template>
  <div :class="classObj" class="app-wrapper">
    <div class="layout-container">
      <div class="header-bar">
        <img class="logo-img" src="../../../static/img/sys_logo.png" alt="">
        <div class="header-info" >
          <span><svg-icon icon-class="user"/> 欢迎 {{ name }}</span> <span class="logout" @click="logout"><span class="cut-line"/><svg-icon icon-class="logout"/> 注销系统</span>
        </div>
      </div>
      <div style="flex-grow: 1;overflow: auto">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <sidebar class="sidebar-container"/>
        <div class="main-container">
          <navbar @refresh = "refresh"/>
          <app-main ref="AppMain"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    logout() {
      this.$confirm('确认注销并返回登录页面？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
    },
    refresh() {
      this.$refs.AppMain.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .layout-container{
      display: flex;
      flex-direction:column;
      height: 100%;
      .header-bar{
        width: 100%;
        height: 60px;
        background: #009688;
        .logo-img{
          margin-left: 25px;
          margin-top: 10px;
        }
        .header-info{
          margin: 20px;
          float: right;
          color:#fff;
          .cut-line{
            display: inline-block;
            height: 12px;
            border-left: 1px solid #fff;
            margin: 0 10px;
          }
          .logout{
            cursor: pointer;
          }
        }
      }
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
