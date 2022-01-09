<template>
  <div class="group-component" ref="group">
    <div
      class="group-component__title"
      :style="groupStyle"
      :class="{ 'group-component__title-collapse': active }"
    >
      <div class="group-component__title-left">
        <Arrow
          :is-active="active"
          class="group-component__arrow"
          @click.native="toggle"
          :style="groupTheme('color')"
        />
        <span :style="groupTheme('color')">{{ groupInfo.name }}</span>
      </div>
      <div class="group-component__title-right" :style="groupTheme('color')">
        {{ groupInfo.children.length}} items
      </div>
    </div>

    <el-collapse-transition>
      <template v-if="!active">
        <slot></slot>
      </template>
    </el-collapse-transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Arrow from "@/components/Arrow/index.vue";
import group from "@/mixins/group";
export default Vue.extend({
  name: "group-component",
  components: { Arrow },
  mixins: [group],
  props: {
    groupInfo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      active: false,
      width: 0,
    };
  },
  computed: {
    groupStyle(): unknown {
      const defaultStyle = { width: `${this.width}px` };
      if (this.active) {
        return { position: "static" };
      }
      return defaultStyle;
    },
  },
  mounted() {
    window.addEventListener("resize", this.getWidth);
    this.$nextTick(this.getWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWidth);
  },
  methods: {
    toggle(): void {
      this.active = !this.active;
    },
    getWidth() {
      const groupRef = this.$refs.group as Element;
      const dom = groupRef.querySelector(".column-component") as HTMLElement;
      const { width } = dom.getBoundingClientRect();
      this.width = width;
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.group-component {
  position: relative;
  margin: 5px;
  .group-component__title {
    position: absolute;
    height: 40px;
    line-height: 40px;
    z-index: 1;
    font-size: 18px;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .group-component__title-right {
      font-size: 14px;
      display: none;
      margin-right: 15px;
    }
    &-collapse {
      .group-component__title-right {
        display: block;
      }
    }
  }
  .group-component__arrow {
    margin-right: 10px;
  }
  @{deep} .column-component {
    &:first-of-type {
      opacity: 0;
    }
  }
}
</style>
