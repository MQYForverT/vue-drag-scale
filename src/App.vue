<template>
  <div>
    <dragScale>
      <div class="course-view"></div>
    </dragScale>
  </div>
</template>

<script setup lang="ts">
import dragScale from "./components/index.vue";

</script>

<style scoped>
.course-view {
  height: 300px;
  width: 300px;
  background: red;
}
</style>
