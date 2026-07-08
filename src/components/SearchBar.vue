<script setup>
import {
  ref,
  defineEmits,
  defineProps,
  watch,
  onUnmounted,
  defineModel,
} from "vue";
const showSearchBar = ref(true);
const focusSearchBar = ref(false);
const emit = defineEmits(["focus", "debouncedSearch"]);

const searchQuery = defineModel();
let timeoutId = null;

watch(searchQuery, (newValue) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    emit("debouncedSearch", newValue);
  }, 500);
});

onUnmounted(() => clearTimeout(timeoutId));
defineProps({
  isVisible: Boolean,
});
</script>

<template>
  <div :class="$style['container']">
    <div
      v-if="showSearchBar"
      :class="[
        $style['search-bar'],
        { [$style['search-bar--open']]: isVisible },
      ]"
    >
      <input
        v-model="searchQuery"
        :class="$style['search-bar__input']"
        type="text"
        placeholder="Search for game you wish..."
        @focus="emit('focus')"
      />
      <button
        type="button"
        :class="[
          $style['search-bar__icon-container'],
          {
            [$style['search-bar__icon-container--open']]: focusSearchBar,
          },
        ]"
      >
        <img
          :class="$style['search-bar__icon']"
          :src="require(`@/assets/icon/search_icon.svg`)"
          alt="Search icon"
        />
      </button>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
  max-height: 230px;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

<style module lang="scss">
$search-bar-radius: 20px;

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 100%;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 260px;
  width: 90%;
  height: 40px;
  background-color: #dbf0fa;
  border: #008ecc solid 1px;
  border-radius: $search-bar-radius;

  &__input {
    outline: none;
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
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>
