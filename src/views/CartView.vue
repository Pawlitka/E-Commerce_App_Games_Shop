<script setup>
import WrapperView from "@/views/WrapperView.vue";
import { ref } from "vue";
const isElementVisible = ref(false);
</script>

<template>
  <div
    v-if="isElementVisible"
    :class="$style['search-overlay']"
    @click="isElementVisible = false"
  ></div>
  <WrapperView
    :is-visible="isElementVisible"
    @update:is-visible="(val) => (isElementVisible = val)"
  >
    <div :class="$style['home']">
      <p :class="$style['test']">Cart view</p>
    </div>
  </WrapperView>
</template>

<style module lang="scss">
.home {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: pink;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.test {
  width: 50%;
  height: 10%;
  display: flex;
  color: black;
}
</style>
