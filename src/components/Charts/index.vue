<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const _this = this
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.options)
      this.chart.on('click', function(e) {
        if (e.seriesName === '报废率') {
          _this.$emit('barClick', e.dataIndex)
        }
      })
    },
    onResize() {
      this.chart.resize()
    },
    eConsole(param) {
      // var mes = '【' + param.type + '】'
      // if (typeof param.seriesIndex !== 'undefined') {
      //   mes += '  seriesIndex : ' + param.seriesIndex;
      //   mes += '  dataIndex : ' + param.dataIndex;
      // }
      // if (param.type === 'hover') {
      //   document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes
      // } else {
      //   document.getElementById('console').innerHTML = mes
      // }
      console.log(param)
    }
  }
}
</script>
