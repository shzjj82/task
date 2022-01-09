<template>
  <el-select class="column-component" v-model="value">
    <el-option
      v-for="columnItem in columnItems"
      :key="columnItem.code"
      :label="columnItem.label"
      :code="columnItem.code"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
import Vue from "vue";
import { IColumnItems } from "@/interface/Conditions";
export default Vue.extend({
  name: "column-component",
  props: {
    column: String,
  },
  data() {
    return {
      value: this.column,
    };
  },
  computed: {
    columnItems(): IColumnItems[] {
      // vuex
      return [];
    },
  },
});
</script>
<style lang="less" scoped>
.column-component{
    width: 170px;
}
</style>