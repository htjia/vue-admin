<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="avatar-container">
      <screenfull class="screenfull" />
      <span class="refresh" @click="refresh"><i class="el-icon-refresh"/> 刷新</span><span v-if="hasBack" class="back" @click="back"><i class="el-icon-arrow-left" />返回</span>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'hasBack'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    back() {
      this.$router.back(-1)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 46px;
  line-height: 46px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 54px;
    height: 46px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    font-size: 14px;
    display: inline-block;
  }
  .avatar-container {
    height: 46px;
    display: inline-block;
    position: absolute;
    right: 20px;
    .refresh{
      margin-left: 15px;
      cursor: pointer;
      font-size: 14px;
      .el-icon-refresh{
        font-size: 23px;
        vertical-align: middle;
        margin-bottom: 2px;
        color:#009688;
      }
    }
    .back{
      margin-left: 15px;
      cursor: pointer;
      .el-icon-arrow-left{
        font-size: 23px;
        vertical-align: middle;
        margin-bottom: 2px;
        color:#009688;
      }
    }
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

