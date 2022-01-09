<template>
  <div class="relationship" v-if="isPrimary">Where</div>
  <el-select class="relationship" v-model="value" v-else>
    <el-option
      v-for="relationship in relationships"
      :key="relationship.value"
      :label="normalizeLabel(relationship.label)"
      :value="relationship.value"
    >
    </el-option>
  </el-select>
</template>
<script lang="ts">
import Vue from "vue";
import { Conditions } from "@/interface";
import { IRelationship } from "@/interface/Conditions";
const { IRelationshipTypes } = Conditions;
export default Vue.extend({
  name: "relationship",
  props: {
    relationship: {
      type: Number,
      default: IRelationshipTypes.And,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.relationship,
    };
  },
  computed: {
    relationships(): IRelationship[] {
      return [
        {
          label: "and",
          value: IRelationshipTypes.And,
        },
        {
          label: "or",
          value: IRelationshipTypes.Or,
        },
      ];
    },
    normalizeLabel(): (label: string) => string {
      return (label) =>
        label.substring(0, 1).toUpperCase() + label.substring(1);
    },
  },
});
</script>
<style lang="less" scoped>
    .relationship{
        width: 80px;
    }
</style>