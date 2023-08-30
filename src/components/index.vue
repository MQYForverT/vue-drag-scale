<template>
  <div class="dragScaleMain">
    <div class="dragScale" @mousedown="onMouseDown" @mousemove="onMousemove" @mouseup="onMouseup"></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { dragProps } from "./index";
import "./style/index.css";

defineOptions({
  name: "vueDragScale",
});

const props = defineProps(dragProps);

const state = reactive({
  domMain: null as HTMLElement | null,
  dom: null as HTMLElement | null,

  dragCodeIsDown: false, //移动有效按键是否按下
  mouseIsDown: false, //鼠标是否按下

  scaleCodeIsDown: false, //缩放有效按键是否按下

  dragPoint: {
    startX: 0,
    startY: 0,
    moveEndX: 0,
    moveEndY: 0,
    endX: 0,
    endY: 0,
  },

  scaleZoom: 1,
});

onMounted(() => {
  state.domMain = document.querySelector(".dragScaleMain") as HTMLElement;
  state.dom = document.querySelector(".dragScale") as HTMLElement;

  //绑定一个鼠标滚动的事件
  state.dom.onwheel = function (event: WheelEvent) {
    event.preventDefault();

    if (!state.scaleCodeIsDown) {
      return;
    }

    //判断鼠标滚轮滚动的方向
    event = event || window.event;
    //alert(event.deltaY);向上120，向下-120
    if (event.deltaY > 0 || event.detail < 0) {
      //火狐event.detail
      //向上滚，放大
      state.scaleZoom += props.scalePercentage;
    } else {
      //向下滚，缩小

      if (state.scaleZoom <= props.minScalePercentage) {
        return;
      }

      state.scaleZoom -= props.scalePercentage;
    }

    const currentTransform = state.domMain?.style.transform as String;
    let result = `scale(${state.scaleZoom})`;

    if (currentTransform.includes("scale")) {
      result = currentTransform.replace(/scale\([^)]+\)/, result);
      state.domMain?.style.setProperty("transform", result);
    } else if (state.domMain) {
      state.domMain.style.transform += result;
    }

    return false;
  };
});

function onMouseDown(e: MouseEvent) {
  if (!state.dragCodeIsDown) {
    return;
  }
  state.mouseIsDown = true;
  state.dragPoint.startX = e.x;
  state.dragPoint.startY = e.y;
}

function onMousemove(e: MouseEvent) {
  if (!state.mouseIsDown) {
    return;
  }

  // 移动中改变位置
  state.dragPoint.moveEndX = e.x - state.dragPoint.startX + state.dragPoint.endX;
  state.dragPoint.moveEndY = e.y - state.dragPoint.startY + state.dragPoint.endY;

  const currentTransform = state.domMain?.style.transform as String;
  let result = `translate(${state.dragPoint.moveEndX}px,${state.dragPoint.moveEndY}px)`;

  if (currentTransform.includes("translate")) {
    result = currentTransform.replace(/translate\([^)]+\)/, result);
    state.domMain?.style.setProperty("transform", result);
  } else if (state.domMain) {
    state.domMain.style.transform += result;
  }
}

function onMouseup() {
  if (!state.mouseIsDown) {
    return;
  }

  state.dragPoint.endX = state.dragPoint.moveEndX;
  state.dragPoint.endY = state.dragPoint.moveEndY;
  state.mouseIsDown = false;
}

// 添加键盘事件监听器
document.addEventListener("keydown", function (event) {
  // 检查按下的键是否是空格键
  if (event.code === props.dragCode) {
    state.dragCodeIsDown = true;
    state.dom?.style.setProperty("display", "block");
    event.preventDefault();
  }

  if (event.code === props.scaleCode) {
    state.scaleCodeIsDown = true;
    state.dom?.style.setProperty("display", "block");
    event.preventDefault();
  }

  // 禁用+-按钮
  if (!props.allowNativeScale) {
    if (
      (event.ctrlKey === true || event.metaKey === true) &&
      (event.key === "-" || event.key === "+" || event.key === "=")
    ) {
      event.preventDefault();
    }
  }
});

// 添加键盘释放事件监听器
document.addEventListener("keyup", function (event) {
  // 检查释放的键是否是空格键
  if (event.code === props.dragCode) {
    state.dragPoint.endX = state.dragPoint.moveEndX;
    state.dragPoint.endY = state.dragPoint.moveEndY;
    state.dom?.style.setProperty("display", "none");
    state.dragCodeIsDown = false;
    state.mouseIsDown = false;
  }

  if (event.code === props.scaleCode) {
    state.dom?.style.setProperty("display", "none");
    state.scaleCodeIsDown = false;
  }
});

window.addEventListener(
  "wheel",
  function (event: MouseEvent) {
    if (!props.allowNativeScale && (event.ctrlKey === true || event.metaKey)) {
      event.preventDefault();
    }
  },
  { passive: false }
);
</script>
