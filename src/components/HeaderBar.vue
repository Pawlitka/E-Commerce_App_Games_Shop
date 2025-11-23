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
    <div :class="$style['header__search-bar']">
      <div :class="$style['search-bar__icon-container']">
        <img
          :class="$style['search-bar__icon']"
          :src="require(`@/assets/icon/search_icon.svg`)"
          alt="Search icon"
        />
      </div>
    </div>
    <div :class="$style['header__user']">
      <img
        :class="$style['user__icon']"
        :src="require(`@/assets/icon/user_icon.svg`)"
        alt="User icon"
      />
      <span :class="$style['user__text']">Log in</span>
    </div>
    <div :class="$style['header__wishlist']"></div>
    <div :class="$style['header__cart']"></div>
  </div>
</template>

<style module lang="scss">
$search-bar-radius: 20px;

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
    justify-content: flex-end;
    align-items: center;
    width: 770px;
    height: 40px;
    background-color: #dbf0fa;
    border: #008ecc solid 1px;
    margin-left: 25px;
    margin-right: 20px;
    border-radius: $search-bar-radius;
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

.search-bar {
  &__icon-container {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 50px;
    height: 40px;
    background-color: #008ecc;
    border-bottom-right-radius: $search-bar-radius;
    border-top-right-radius: $search-bar-radius;

    &__icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
