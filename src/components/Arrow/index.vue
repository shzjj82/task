<template>
  <i
    class="arrow-component el-icon-arrow-down"
    :style="{ transform: `rotate(${angle}deg)` }"
  ></i>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "arrow-component",
  props: {
    activateAngle: {
      default: 180,
      type: Number,
    },
    inactiveAngle: {
      default: 0,
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    angle(): number {
      return this.isActive ? this.activateAngle : this.inactiveAngle;
    },
  },
});
</script>
<style lang="less" scoped>
.arrow-component {
  transition: all 0.3s;
}
</style>
