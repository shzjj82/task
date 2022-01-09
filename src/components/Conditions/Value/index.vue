<template>
  <el-select class="value-component" v-model="value">
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
import { IConditionItems } from "@/interface/Conditions";
export default Vue.extend({
  name: "value-component",
  props: {
    valueResult: String,
  },
  data() {
    return {
      value: this.valueResult,
    };
  },
  computed: {
    columnItems(): IConditionItems[] {
      // vuex
      return [];
    },
  },
});
</script>
<style lang="less" scoped>
.value-component{
    flex-grow: 1;
}
</style>