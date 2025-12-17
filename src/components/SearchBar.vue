<script setup>
import { ref } from "vue";
const showSearchBar = ref(true);
const focusSearchBar = ref(false);
</script>

<template>
  <div
    v-if="focusSearchBar === true"
    :class="$style['search-bar__expanded']"
  ></div>
  <div v-if="showSearchBar === true" :class="$style['search-bar']">
    <input
      :class="$style['search-bar__input']"
      type="text"
      placeholder="Search for game you wish..."
      @focus="focusSearchBar = true"
      @blur="focusSearchBar = false"
    />
    <button type="button" :class="$style['search-bar__icon-container']">
      <img
        :class="$style['search-bar__icon']"
        :src="require(`@/assets/icon/search_icon.svg`)"
        alt="Search icon"
      />
    </button>
  </div>
</template>

<style module lang="scss">
$search-bar-radius: 20px;

.search-bar__expanded {
  display: flex;
  min-height: 80%;
  width: 78%;
  background-color: #ffffff;
  border: 1px solid #878787;
  position: fixed;
  z-index: -1;
  border-radius: $search-bar-radius;
}

.search-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 260px;
  width: 100%;
  height: 40px;
  background-color: #dbf0fa;
  border: #008ecc solid 1px;
  border-radius: $search-bar-radius;

  &__input {
    border: none;
    width: 100%;
    height: 100%;
    background-color: #dbf0fa;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    color: #000000;
    padding-left: 20px;
    border-bottom-left-radius: $search-bar-radius;
    border-top-left-radius: $search-bar-radius;
  }

  &__input::placeholder {
    color: #878787;
  }

  &__icon-container {
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 50px;
    height: 40px;
    background-color: #008ecc;
    border-bottom-right-radius: $search-bar-radius;
    border-top-right-radius: $search-bar-radius;

    &:hover {
      background-color: #2d94c1;
    }

    &__icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
