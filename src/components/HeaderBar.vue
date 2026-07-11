<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
import debounce from "lodash-es/debounce";
const showNavigation = ref(true);
const searchContainerRef = ref(null);
const results = ref([]);
const isLoading = ref(false);
const searchQuery = ref("");
const categories = ["Trending", "By Genre", "By Name"];
let currentController = null;

const selectedCategory = ref(categories[0]);

const selectCategory = (category) => {
  selectedCategory.value = category;
};
const handleSearch = async (query) => {
  if (currentController) {
    currentController.abort();
  }

  const controller = new AbortController();
  currentController = controller;
  isLoading.value = true;

  try {
    const res = await fetch(
      `http://localhost:8080/games/search?title=${encodeURIComponent(query)}`,
      {
        signal: controller.signal,
      }
    );

    results.value = await res.json();
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Błąd pobierania:", error);
    }
  } finally {
    if (currentController === controller && !controller.signal.aborted) {
      isLoading.value = false;
    }
  }
};

const debouncedSearch = debounce((query) => {
  const currentQuery = searchQuery.value.trim();

  if (currentQuery.length < 3 || currentQuery !== query) {
    return;
  }

  handleSearch(query);
}, 500);
watch(searchQuery, (newQuery) => {
  const trimmedQuery = newQuery.trim();

  if (trimmedQuery.length >= 3) {
    isLoading.value = true;
    debouncedSearch(trimmedQuery);
  } else {
    if (currentController) {
      currentController.abort();
      currentController = null;
    }
    results.value = [];
    isLoading.value = false;
  }
});

const highlightText = (text, query) => {
  const queryString = query ? String(query) : "";
  if (!queryString) {
    return {
      before: text,
      matched: "",
      remaining: "",
    };
  }
  const index = text.toLowerCase().indexOf(queryString.toLowerCase());

  if (index === -1) {
    return {
      before: text,
      matched: "",
      remaining: "",
    };
  }

  return {
    before: text.substring(0, index),
    matched: text.substring(index, index + queryString.length),
    remaining: text.substring(index + queryString.length),
  };
};

defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(["update:isVisible"]);

onClickOutside(searchContainerRef, () => {
  emit("update:isVisible", false);
});
</script>
<template>
  <div
    ref="searchContainerRef"
    :class="[
      $style['container'],
      { [$style['container--expanded']]: isVisible },
    ]"
  >
    <div
      v-if="showNavigation === true"
      :class="[$style['header'], { [$style['header--expanded']]: isVisible }]"
    >
      <div :class="$style['header__logo-container']">
        <img
          :class="$style['logo-container__logo']"
          :src="require(`@/assets/logo/cat_logo_blue.svg`)"
          alt="Site logo"
        />
        <span :class="$style['logo-container__title']">PURRSTORE</span>
      </div>
      <SearchBar
        v-model="searchQuery"
        :is-visible="isVisible"
        @debounced-search="handleSearch"
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
    <div v-if="isVisible" :class="$style['search__wrapper--expanded']">
      <ul :class="$style['categories']">
        <li
          v-for="category in categories"
          :key="category"
          :class="[
            $style['categories__item'],
            {
              [$style['categories__item--selected']]:
                selectedCategory === category,
            },
          ]"
          @click="selectCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
      <div :class="$style['wrapper']">
        <div v-if="isLoading" :class="$style['list__item--loading']">
          Ładowanie...
        </div>
        <div v-else-if="results.length > 0" :class="$style['list']">
          <template v-for="item in results" :key="item.id">
            <div :class="$style['list__item']">
              <span :class="$style['list__item--miss-matched']">{{
                highlightText(item.title, searchQuery).before
              }}</span>
              <span :class="$style['list__item--matched']">{{
                highlightText(item.title, searchQuery).matched
              }}</span>
              <span :class="$style['list__item--miss-matched']">
                {{ highlightText(item.title, searchQuery).remaining }}</span
              >
            </div>
          </template>
        </div>
        <div
          v-else-if="searchQuery.trim().length >= 3"
          :class="$style['list__item--no-results']"
        >
          <span :class="$style['list__item--no-results__emoji']">\(o_o)/</span>
          <span :class="$style['list__item--no-results__text']"
            >no product found for '{{ searchQuery }}'</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  width: 100%;
  border-bottom: 1px solid #878787;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;

  &--expanded {
    backdrop-filter: blur(1px);
    background-color: #7f7f7f;
  }
}

.search__wrapper--expanded {
  top: 100%;
  position: absolute;
  width: 85%;
  padding: 10px 20px;
  min-height: 450px;
  max-height: 900px;
  background-color: #ffffff;
  z-index: -1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #878787;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 85%;
  z-index: 1;
  padding: 10px 20px;
  background-color: #ffffff;

  &__logo-container {
    display: flex;
    align-items: center;
  }

  &--expanded {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid #878787;
    border-bottom: none;
  }
}

.logo-container {
  &__logo {
    width: 70px;
    height: 60px;
  }

  &__title {
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
.wrapper {
  display: flex;
}

.categories {
  display: flex;
  flex-direction: column;
  width: 15%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  float: left;

  &__item {
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    border-radius: 10px;
    padding: 0 20px;
    color: #878787;
    cursor: pointer;

    &:not(&--selected):hover {
      background: #dbf0fa;
    }

    &--selected {
      background: #008ecc;
      color: #ffffff;
    }
  }
}

.list {
  width: 100%;
  align-items: flex-start;
  color: black;
  font-size: 1rem;
  font-family: "Jersey 25", sans-serif;
  font-style: normal;

  &__item {
    display: block;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &--matched {
      color: black;
    }

    &--miss-matched {
      color: #878787;
    }

    &--matched,
    &--miss-matched {
      white-space: pre;
    }

    &:hover {
      background: #dbf0fa;
    }

    &--loading {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1.5rem;
      width: 100%;
    }

    &--no-results {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 5%;
      color: #878787;
      font-family: "Jersey 25", sans-serif;
      font-weight: 400;

      &__emoji {
        font-size: 8rem;
      }

      &__text {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
