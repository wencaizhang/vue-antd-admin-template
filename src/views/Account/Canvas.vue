<template>
  <section>

    <canvas id="canvas"></canvas>
  </section>
</template>

<script>
import createCanvas from './canvas.js';
export default {
  name: '',
  mounted () {
    createCanvas()
  },
  data () {
    return {

    }
  },
  methods: {

  },
}
</script>

<style scoped>

canvas {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
