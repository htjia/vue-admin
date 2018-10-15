<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view :key="activeKey"/>
    </transition>
  </section>
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
  /*min-height: calc(100vh - 105px);*/
  flex-grow: 1;
  position: relative;
  overflow: auto;
  background: #E5E5E5;
  padding: 10px;
}
</style>
