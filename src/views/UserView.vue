<script setup>
import WrapperView from "@/views/WrapperView.vue";
</script>

<template>
  <WrapperView>
    <div :class="$style['home']">
      <p :class="$style['test']">User view</p>
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

.test {
  width: 50%;
  height: 10%;
  display: flex;
  color: black;
}
</style>
