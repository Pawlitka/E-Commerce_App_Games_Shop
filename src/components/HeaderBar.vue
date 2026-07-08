<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
const showNavigation = ref(true);
const isElementVisible = ref(false);
const searchContainerRef = ref(null);
const results = ref([]);
const isLoading = ref(false);
const searchQuery = ref("");

const handleSearch = async (query) => {
  if (!query) {
    results.value = [];
    return;
  }

  isLoading.value = true;
  try {
    const res = await fetch(
      `http://localhost:8080/games/search?title=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`Serwer odpowiedział statusem: ${res.status}`);
    }

    results.value = await res.json();
  } catch (error) {
    console.error("Błąd pobierania:", error);
  } finally {
    isLoading.value = false;
  }
};

watch(searchQuery, (newQuery) => {
  handleSearch(newQuery);
});

// eslint-disable-next-line
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
  isElementVisible.value = false;
  emit("update:isVisible", false);
});
</script>
<template>
  <div
    :class="[
      $style['container'],
      { [$style['container--expanded']]: isVisible },
    ]"
  >
    <div
      v-if="showNavigation === true"
      ref="searchContainerRef"
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
      <ul :class="$style['list__categories']">
        <li :class="$style['list__categories__item']">Trending</li>
        <li :class="$style['list__categories__item']">By Genre</li>
        <li :class="$style['list__categories__item']">By Name</li>
      </ul>
      <div :class="$style['wrapper']">
        <div v-if="!isLoading && results.length > 0" :class="$style['list']">
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
        <div v-else :class="$style['list__item--loading']">Ładowanie...</div>
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
  min-height: 300px;
  max-height: 900px;
  background-color: #ffffff;
  z-index: -1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom: 1px solid #878787;
  border-left: 1px solid #878787;
  border-right: 1px solid #878787;
  border-top: 1px solid #878787;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 1420px;
  width: 85%;
  z-index: 100;
  padding: 10px 20px;
  background-color: #ffffff;

  &__logo-container {
    justify-content: start;
    display: flex;
    align-items: center;
  }

  &--expanded {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-top: 1px solid #878787;
    border-right: 1px solid #878787;
    border-left: 1px solid #878787;
  }
}

.logo-container {
  &__logo {
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
.wrapper {
  display: flex;
}

.list__categories {
  display: flex;
  flex-direction: column;
  width: 15%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  float: left;

  &__item {
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    border-radius: 20px;
    padding: 0 20px;

    &:hover {
      background: #2d94c1;
      color: #ffffff;
    }
  }
}

.list {
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
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
  }
}

.list__item--loading {
  &--loading {
    margin-top: 4px;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 1.5rem;
    width: 30%;
  }
}
</style>
