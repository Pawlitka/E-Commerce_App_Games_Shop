<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
const showNavigation = ref(true);
const isElementVisible = ref(false);
const searchContainerRef = ref(null);
const results = ref([]);
const isLoading = ref(false);

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
  <div :class="$style['container']">
    <div
      v-if="showNavigation === true"
      ref="searchContainerRef"
      :class="$style['header']"
    >
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
                {{ item.title }}
              </div>
            </template>
          </div>
          <div v-else :class="$style['list__item--loading']">Ładowanie...</div>
        </div>
      </div>
      <div :class="$style['header__logo-container']">
        <img
          :class="$style['logo-container__logo']"
          :src="require(`@/assets/logo/cat_logo_blue.svg`)"
          alt="Site logo"
        />
        <span :class="$style['logo-container__title']">PURRSTORE</span>
      </div>
      <SearchBar
        :is-visible="isVisible"
        @debouncedSearch="handleSearch"
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
.container {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #878787;
  height: 70px;
  display: flex;
  justify-content: center;
}

.search__wrapper--expanded {
  top: 0;
  width: 85%;
  height: 100%;
  min-height: 600px;
  max-height: 900px;
  background-color: #ffffff;
  display: flex;
  z-index: -1;
  border-radius: 20px;
  border: 1px solid #878787;
  position: absolute;
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
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-top: 80px;
}

.list__categories {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-top: 80px;
  margin-left: 20px;

  &__item {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: #878787;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    border-radius: 20px;

    &:hover {
      background: #2d94c1;
      color: #ffffff;
    }
  }
}

.list {
  width: 100%;
  height: 85px;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: black;
  font-size: 1rem;
  font-family: "Jersey 25", sans-serif;
  font-style: normal;
  gap: 5px;

  &__item {
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    width: 90%;
    height: 80px;
    border-radius: 20px;
    padding-left: 30px;

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
