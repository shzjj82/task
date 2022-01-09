<template>
  <div class="menu-row" v-if="isSingle" @click="command">
    <!-- <i :class="item.icon" /> -->
    <span class="menu-row__title">{{ item.label }}</span>
  </div>
  <div v-else class="menu-group">
    <MenuItem
      v-for="(row, index) in item"
      :key="index"
      :item="row"
      @command="$emit('command', $event)"
    ></MenuItem>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MenuItem",
  props: {
    item: {
      type: [Object, Array],
      required: true,
    },
  },
  computed: {
    isSingle(): boolean {
      return !Array.isArray(this.item);
    },
    menuItemClassName(): string {
      return this.isSingle ? "menu-row" : "menu-group";
    },
  },
  methods: {
    command(): void {
      const { command } = this.item;
      this.$emit("command", command);
    },
  },
});
</script>
<style lang="less" scoped>
@deep: ~">>>";
.menu-group {
  display: inline-block;
  margin-right: 8px;
  &:last-of-type {
    margin-right: 0;
  }
  //   @{deep}
}
.menu-row {
  font-size: 14px;
  line-height: 24px;
  height: 24px;
  color: #676879;
  min-width: 180px;
  padding: 4px 8px;
  cursor: pointer;
  text-indent: 1em;
  color: #323338;
  border-radius: 4px;
  &:hover {
    background: #e6e9ef;
  }
}
</style>
