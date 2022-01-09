<template>
  <div class="column-component" :style="normalzieStyle">
    {{ column.label }}
  </div>
</template>
<script lang="ts">
import { get } from "lodash";
import Vue from "vue";
export default Vue.extend({
  name: "column-component",
  props: {
    column: {
      required: true,
      type: Object,
    },
  },
  computed: {
    normalzieStyle() {
      const { textalign, width } = this.column;
      const style = {
        "text-align": textalign,
      };
      return Object.assign(
        {},
        style,
        width ? { width: `${width}px` } : { flex: 1 }
      );
    },
  },
});
</script>
<style lang="less" scoped>
.column-component {
  color: #333;
  font-size: 14px;
  text-align: center;
  margin-right: 1px;
  height: 40px;
  line-height: 40px;
  &:last-of-type{
      margin-right: 0;
  }
}
</style>
