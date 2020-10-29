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
	width: 50%;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0.1;
}
</style>
