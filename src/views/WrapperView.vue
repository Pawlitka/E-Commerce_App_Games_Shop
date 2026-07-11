<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <HeaderBar :class="$style['wrapper__header-bar']" :show-navigation="true" />
    <div :class="$style['wrapper__content']"><slot></slot></div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__header-bar {
    position: sticky;
    top: 0;
    margin-bottom: 20px;
    z-index: 1;
  }

  &__content {
    max-width: 1420px;
  }
}
</style>
