<template>
  <div id="app">
    <!-- <Capture /> -->
    <Sketch />
  </div>
</template>

<script>
import Capture from '@/components/Detection/capture.vue'
import Sketch from '@/components/Sketch/'
export default {
  name: 'App',
  components: {
    Capture,
    Sketch
  }
}
</script>

<style lang="scss" scoped></style>
