<template>
  <el-select class="condition-component" v-model="value">
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
  name: "condition-component",
  props: {
    conditionResult: String,
  },
  data() {
    return {
      value: this.conditionResult,
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
    .condition-component{
        width: 150px;
    }
</style>