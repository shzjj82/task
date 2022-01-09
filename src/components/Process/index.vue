<template>
  <div class="process-component">
    <el-progress :percentage="processLine" color="red"></el-progress>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "process-component",
  props: {
    processLine: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    status() {
      return {};
    },
  },
});
</script>
<style lang="less" scoped>
.process-component {
  flex-grow: 1;
  margin: 0 16px;
}
</style>
