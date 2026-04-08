<script setup>
import { ref } from "vue";
const showSearchBar = ref(true);
const focusSearchBar = ref(false);
const searchHistory = ref([]);

function handleSearchBarFocus() {
  if (searchHistory.value.length === 0) return;

  focusSearchBar.value = true;
}

function handleSearchBarBlur() {
  if (searchHistory.value.length === 0) return;
  focusSearchBar.value = false;
}
</script>

<template>
  <div :class="$style['main-container']">
    <div
      v-if="showSearchBar"
      :class="[
        $style['search-bar'],
        { [$style['search-bar--results-shown']]: focusSearchBar },
      ]"
    >
      <input
        :class="[
          $style['search-bar__input'],
          { [$style['search-bar__input--results-shown']]: focusSearchBar },
        ]"
        type="text"
        placeholder="Search for game you wish..."
        @focus="handleSearchBarFocus"
        @blur="handleSearchBarBlur"
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
    <div :class="$style['container']">
      <Transition name="fade">
        <div
          v-if="focusSearchBar"
          :class="$style['search-bar__expanded']"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
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

.search-bar__expanded {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 30vh;
  max-height: 60vh;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #878787;
  z-index: -1;
  border-bottom-left-radius: $search-bar-radius;
  border-bottom-right-radius: $search-bar-radius;
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

  &--results-shown {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

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

    &--results-shown {
      border-bottom-left-radius: 0;
    }
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

    &--results-shown {
      border-bottom-right-radius: 0;
    }
  }
}
</style>
