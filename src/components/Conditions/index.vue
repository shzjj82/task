<template>
  <el-popover
    class="conditions-component"
    trigger="click"
    v-model="visible"
    ref="popover"
    :append-to-body="false"
  >
    <div class="conditions-container">
      <div
        class="conditions-item"
        v-for="(condition, index) in conditions"
        :key="condition.id"
      >
        <template v-for="column in columns">
          <RelationShip
            v-if="factoryComponent('relationship', column.code)"
            :relationship="condition[column.code]"
            :is-primary="isPrimary(index)"
            :condition="condition"
            :key="column.code"
            class="conditions-item__column"
          />
          <ColumnComponent
            v-if="factoryComponent('column', column.code)"
            :column="condition[column.code]"
            :condition="condition"
            :key="column.code"
            class="conditions-item__column"
          />
          <ConditionComponent
            v-if="factoryComponent('condition', column.code)"
            :conditionResult="condition[column.code]"
            :condition="condition"
            :key="column.code"
            class="conditions-item__column"
          />
          <ValueComponent
            v-if="factoryComponent('value', column.code)"
            :valueResult="condition[column.code]"
            :condition="condition"
            :key="column.code"
            class="conditions-item__column"
          />
        </template>
        <i
          class="conditions-item__close conditions-item__column el-icon-close"
          @click="handleClick(index)"
        ></i>
      </div>
      <div class="conditions-item-add" @click="addCondition">
        <i class="el-icon-plus"></i> Add new filter
      </div>
    </div>

    <template slot="reference">
      <slot>
        <el-button slot="reference" type="primary">click 激活</el-button>
      </slot>
    </template>
  </el-popover>
</template>
<script lang="ts">
import Vue from "vue";
import RelationShip from "@/components/Conditions/RelationShip/index.vue";
import ColumnComponent from "@/components/Conditions/Column/index.vue";
import ConditionComponent from "@/components/Conditions/Condition/index.vue";
import ValueComponent from "@/components/Conditions/Value/index.vue";
import { isEqual } from "lodash";
import { Conditions } from "@/interface";
import { v4 as uuidv4 } from "uuid";
const { IColumnTypes, IRelationshipTypes } = Conditions;
export default Vue.extend({
  name: "conditions-component",
  components: {
    RelationShip,
    ColumnComponent,
    ConditionComponent,
    ValueComponent,
  },
  data() {
    return {
      visible: false,
      conditions: [],
      columns: [
        {
          label: "relationship",
          code: IColumnTypes.Relationship,
          defaultValue: IRelationshipTypes.And,
        },
        {
          label: "column",
          code: IColumnTypes.Column,
          defaultValue: "",
        },
        {
          label: "condition",
          code: IColumnTypes.Condition,
          defaultValue: "",
        },
        {
          label: "value",
          code: IColumnTypes.Value,
          defaultValue: "",
        },
      ],
    };
  },
  computed: {
    isPrimary(): (index: number) => boolean {
      return (index) => isEqual(index, 0);
    },
    factoryComponent(): (
      code: string,
      componentCode: typeof IColumnTypes
    ) => boolean {
      return (code, componentCode) => isEqual(code, componentCode);
    },
  },
  created() {
    this.handleRest();
  },
  methods: {
    defaultRowCondition() {
      const columns = this.columns;
      return columns.reduce(
        (result, item) => {
          const { code, defaultValue } = item;
          return { ...result, [code]: defaultValue };
        },
        { id: uuidv4() }
      );
    },
    handleClick(index: number) {
      const conditions = this.conditions;
      if (conditions.length <= 1) {
        return this.handleRest();
      }
      this.conditions.splice(index, 1);
      this.$nextTick(() => {
        const popoverRef: any = this.$refs.popover;
        popoverRef.updatePopper();
      });
    },
    handleRest() {
      const defaultValue = this.defaultRowCondition();
      this.$set(this, "conditions", [defaultValue]);
    },
    addCondition() {
      const defaultValue = this.defaultRowCondition();
      this.$set(this, "conditions", [...this.conditions, defaultValue]);
      this.$nextTick(() => {
        const popoverRef: any = this.$refs.popover;
        popoverRef.updatePopper();
      });
    },
  },
});
</script>
<style lang="less" scoped>
.conditions-component {
  .conditions-container{
    padding: 20px 10px;
  }
  .conditions-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .conditions-item__column {
      margin-right: 8px;
      &:last-of-type {
        margin-right: 0;
      }
    }
    .conditions-item__close {
      margin-left: 8px;
      cursor: pointer;
    }
  }
  .conditions-item-add {
    color: #323338;
    padding: 4px 8px;
    line-height: 24px;
    height: 24px;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    &:hover {
      background: #c5c7d0;
    }
  }
}
</style>
