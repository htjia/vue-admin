<template>
  <!--<el-scrollbar class="scrollbar-wrapper">-->
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view :key="activeKey"/>
    </transition>
  </section>
  <!--</el-scrollbar>-->
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      activeKey: ''
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  methods: {
    fetchData() {
      this.activeKey = Math.random()
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 106px);
  flex-grow: 1;
  position: relative;
  overflow: auto;
  background: #E5E5E5;
  padding: 10px;

}
</style>
