<template>
  <figure class="BackgroundGlobe" data-js-controller="BackgroundGlobe">
    <div id="jsGlobe" class="Globe js-globe Globe--isAngled"></div>
  </figure>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Globe",
  components: {},
  data() {
    return {};
  },
  mounted() {
    window.loadGlobe("#jsGlobe");
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
body {
  margin: 0;
}
.js-globe {
  margin: auto;
  width: 100% !important;
}
.js-globe > canvas {
  width: 100% !important;
  height: auto !important;
}
@media (prefers-reduced-motion: no-preference) {
  .Globe {
    cursor: -webkit-grab;
    cursor: grab;
  }
  .is-globe-dragging .Globe {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
}
</style>
