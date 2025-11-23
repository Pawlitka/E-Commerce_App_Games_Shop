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
    <div :class="$style['header__search-bar']"></div>
    <div :class="$style['header__user']"></div>
    <div :class="$style['header__wishlist']"></div>
    <div :class="$style['header__cart']"></div>
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
    justify-content: start;
    display: flex;
    align-items: center;
  }

  &__search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 770px;
    height: 40px;
    fill: #dbf0fa;
    border: #008ecc solid 1px;
    margin-left: 25px;
    margin-right: 20px;
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
