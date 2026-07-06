<script setup>
import { ref, defineEmits, defineProps, watch, onUnmounted } from "vue";
const showSearchBar = ref(true);
const focusSearchBar = ref(false);
const emit = defineEmits(["focus", "debouncedSearch"]);

const searchQuery = ref("");
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
  <div :class="$style['main-container']">
    <div
      v-if="showSearchBar"
      :class="[
        $style['search-bar'],
        { [$style['search-bar--results-shown']]: isVisible },
      ]"
    >
      <input
        v-model="searchQuery"
        :class="[
          $style['search-bar__input'],
          { [$style['search-bar__input--results-shown']]: focusSearchBar },
        ]"
        type="text"
        placeholder="Search for game you wish..."
        @focus="emit('focus')"
      />
      <button
        type="button"
        :class="[
          $style['search-bar__icon-container'],
          {
            [$style['search-bar__icon-container--results-shown']]:
              focusSearchBar,
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

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  position: relative;
  width: 100%;
  height: 0;
}

//.search-bar__expanded {
//  position: absolute;
//  top: 0;
//  width: 100%;
//  min-height: 300px;
//  max-height: 600px;
//  background-color: #dbf0fa;
//  border: 1px solid #878787;
//  border-top: none;
//  z-index: 0;
//  border-bottom-left-radius: $search-bar-radius;
//  border-bottom-right-radius: $search-bar-radius;
//}

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
      width: 24px;
      height: 24px;
    }
  }
}
</style>
