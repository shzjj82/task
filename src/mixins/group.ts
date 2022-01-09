import { get } from 'lodash';
import Vue from "vue";

enum groupThemeTypes {
    background = "background",
    color = "color",
  }

export default Vue.extend({
  props: {
    groupInfo: {
      type: Object,
      default:()=>({})
    },
  },
  computed:{
    groupTheme(): (...conditions: string[]) => unknown {
        const themeColor = get(this.groupInfo, "color", "#333333");
        return (...conditions) => {
          const result = {};
          if (conditions.includes(groupThemeTypes.background)) {
            Object.assign(result, { background: themeColor });
          }
          if(conditions.includes(groupThemeTypes.color)){
             Object.assign(result, { color: themeColor });
          }
          return result;
        };
      },
  },
});
