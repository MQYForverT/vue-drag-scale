import type { ExtractPropTypes } from "vue";

export const dragProps = {
  // 自定义code请到https://juejin.cn/post/7029319401178398728查询
  // 当按下约定拖拽键时，允许移动操作
  dragCode: {
    type: String,
    default: "Space",
  },
  // 当按下约定缩放键时，允许缩放操作
  scaleCode: {
    type: String,
    default: "Space",
  },
  // 每次缩放比例
  scalePercentage: {
    type: Number,
    default: 0.05,
  },
  // 最小缩放比例
  minScalePercentage: {
    type: Number,
    default: 0.1,
  },
  // 是否允许原生缩放事件,比如ctrl + ,ctrl -
  allowNativeScale: {
    type: Boolean,
    default: false,
  },
};
// ExtractPropTypes:提取属性类型
export type dragProps = ExtractPropTypes<typeof dragProps>;
