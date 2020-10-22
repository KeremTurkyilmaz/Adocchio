<template>
  <div id="app">
    <Sketch />
    <Capture />
  </div>
</template>

<script>
import Capture from '@/components/detection/capture.vue'
import Sketch from '@/components/sketch/'
export default {
  name: 'App',
  components: {
    Capture,
    Sketch
  }
}
</script>

<style lang="scss" scoped>
/deep/ .capture {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
