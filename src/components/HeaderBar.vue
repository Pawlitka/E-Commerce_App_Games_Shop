<script setup>
import { ref } from "vue";
const showNavigation = ref(true);
</script>
<template>
  <div :class="$style['header-container']">
    <div v-if="showNavigation === true" :class="$style['header']">
      <div :class="$style['header__logo-container']">
        <img
          :class="$style['logo-container__logo-cat']"
          :src="require(`@/assets/logo/cat_logo_blue.svg`)"
          alt="Site logo"
        />
        <span :class="$style['logo-container__title']">PURRSTORE</span>
      </div>
      <!--    TODO move search-bar to separate container -->
      <div :class="$style['header__search-bar']">
        <input
          :class="$style['search-bar__input']"
          type="text"
          placeholder="Search for game you wish..."
        />
        <button type="button" :class="$style['search-bar__icon-container']">
          <img
            :class="$style['search-bar__icon']"
            :src="require(`@/assets/icon/search_icon.svg`)"
            alt="Search icon"
          />
        </button>
      </div>
      <!--    TODO END-->
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
$search-bar-radius: 20px;

.header-container {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #878787;
  height: 70px;
  display: flex;
  justify-content: center;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 1420px;
  width: 100%;

  &__logo-container {
    justify-content: start;
    display: flex;
    align-items: center;
  }

  &__search-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 260px;
    width: 100%;
    height: 40px;
    background-color: #dbf0fa;
    border: #008ecc solid 1px;
    //margin-left: 25px;
    //margin-right: 20px;
    border-radius: $search-bar-radius;
  }
}

.logo-container {
  &__logo-cat {
    width: 70px;
    height: 60px;
    //margin-right: 15px;
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
