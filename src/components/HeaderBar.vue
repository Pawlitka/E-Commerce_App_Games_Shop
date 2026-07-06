<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
const showNavigation = ref(true);
const isElementVisible = ref(false);
const searchContainerRef = ref(null);

defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(["update:isVisible"]);

onClickOutside(searchContainerRef, () => {
  isElementVisible.value = false;
  emit("update:isVisible", false);
});
</script>
<template>
  <div :class="$style['header-container']">
    <div
      v-if="showNavigation === true"
      ref="searchContainerRef"
      :class="$style['header']"
    >
      <div v-if="isVisible" :class="$style['search__wrapper--expanded']"></div>
      <div :class="$style['header__logo-container']">
        <img
          :class="$style['logo-container__logo-cat']"
          :src="require(`@/assets/logo/cat_logo_blue.svg`)"
          alt="Site logo"
        />
        <span :class="$style['logo-container__title']">PURRSTORE</span>
      </div>
      <SearchBar
        :show-search-bar="true"
        @update-visibility="isElementVisible = true"
        @focus="emit('update:isVisible', true)"
      />
      <button type="button" :class="$style.action">
        <img
          :class="$style['action__icon']"
          :src="require(`@/assets/icon/user_icon.svg`)"
          alt="User icon"
        />
        <span :class="$style['action__text']">Sign in</span>
      </button>
      <button type="button" :class="$style.action">
        <img
          :class="$style['action__icon']"
          :src="require(`@/assets/icon/favourite_icon.svg`)"
          alt="Favourite icon']"
        />
        <span :class="$style['action__text']">Favourite</span>
      </button>
      <button type="button" :class="$style.action">
        <img
          :class="$style['action__icon']"
          :src="require(`@/assets/icon/shopping-cart_icon_blue.svg`)"
          alt="Cart icon']"
        />
        <span :class="$style['action__text']">Cart</span>
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.header-container {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #878787;
  height: 70px;
  display: flex;
  justify-content: center;
}

.search__wrapper--expanded {
  position: absolute;
  top: 0;
  width: 75%;
  height: 100%;
  min-height: 600px;
  max-height: 900px;
  background-color: #ffffff;
  display: flex;
  z-index: -1;
  border-radius: 20px;
  border: 1px solid #878787;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 1420px;
  width: 100%;
  z-index: 100;

  &__logo-container {
    justify-content: start;
    display: flex;
    align-items: center;
  }
}

.logo-container {
  &__logo-cat {
    width: 70px;
    height: 60px;
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

.action {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  border: none;
  border-left: 1px solid #878787;
  padding-left: 10px;
  background-color: #ffffff;
  color: #878787;
  cursor: pointer;

  &__icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  &__text {
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    white-space: nowrap;
  }

  &:hover {
    color: #515151;
  }
}
</style>
