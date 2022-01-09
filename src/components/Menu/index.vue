<template>
  <el-popover
    class="menu-component"
    trigger="click"
    v-model="visible"
    :append-to-body="false"
  >
    <div class="basic-content menu-component__content">
      <div class="section-title" v-if="basic.title">{{ basic.title }}</div>
      <MenuItem
        :item="item"
        v-for="(item, index) in basic.children"
        :key="index"
        @command="command"
      />
    </div>
    <div
      class="advance-content menu-component__content"
      v-if="advance.children.length"
    >
      <div class="section-title" v-if="advance.title">{{ advance.title }}</div>
      <MenuItem
        :item="item"
        v-for="(item, index) in advance.children"
        :key="index"
        @command="command"
      />
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
import MenuItem from "./menu-item.vue";
export default Vue.extend({
  name: "menu-component",
  components: { MenuItem },
  props: {
    trigger: {
      type: String,
      default: "click",
    },
    basic: {
      type: Object,
      default: () => ({}),
    },

    advance: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    command(command: string) {
      if (command) {
        this.$emit("command", command);
      }
      this.$nextTick(this.toggleVisible);
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ '>>>';
.menu-component {
  max-width: 400px;
  &__content {
    padding: 8px;
  }
  .advance-divider {
    margin: 10px 0;
  }
  .section-title {
    padding-left: 8px;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 8px;
  }
}
</style>
