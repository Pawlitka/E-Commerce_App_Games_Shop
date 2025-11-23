<script setup>
import { ref } from "vue";
const showNavigation = ref(true);
</script>
<template>
  <div v-if="showNavigation === true" :class="$style['header']">
    <div :class="$style['header__logo-container']">
      <img
        :class="$style['logo-container__logo-cat']"
        :src="require(`@/assets/logo/cat_logo_blue.svg`)"
        alt="Site logo"
      />
      <span :class="$style['logo-container__title']">PURRSTORE</span>
    </div>
  </div>
</template>

<style module lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #ffffff;

  &__logo-container {
    display: flex;
    align-items: center;
  }
}

.logo-container {
  &__logo-cat {
    width: 70px;
    height: 60px;
    margin-right: 15px;
  }

  &__title {
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    color: #008ecc;
  }
}
</style>
