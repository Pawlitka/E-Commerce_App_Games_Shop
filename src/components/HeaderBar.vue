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
      <input
        :class="$style['search-bar__input']"
        type="text"
        placeholder="Search for game you wish..."
      />
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
      <span :class="$style['user__text']">Sign in</span>
    </div>
    <div :class="$style['header__favourite']">
      <img
        :class="$style['favourite__icon']"
        :src="require(`@/assets/icon/favourite_icon.svg`)"
        alt="Favourite icon']"
      />
      <span :class="$style['favourite__text']">Favourite</span>
    </div>
    <div :class="$style['header__cart']">
      <img
        :class="$style['cart__icon']"
        :src="require(`@/assets/icon/shopping-cart_icon_blue.svg`)"
        alt="Favourite icon']"
      />
      <span :class="$style['cart__text']">Cart</span>
    </div>
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

  &__user {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    border-left: 1px solid #878787;
    margin-right: 20px;
    padding-left: 10px;
  }

  &__favourite {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    border-left: 1px solid #878787;
    padding-left: 20px;
    margin-right: 30px;
  }

  &__cart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    border-left: 1px solid #878787;
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

.user {
  &__icon {
    width: 30px;
    height: 30px;
  }
  &__text {
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    color: #878787;
  }
}

.favourite {
  &__icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  &__text {
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    color: #878787;
  }
}

.cart {
  &__icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  &__text {
    font-size: 1.2rem;
    font-family: "Jersey 25", sans-serif;
    font-style: normal;
    color: #878787;
  }
}
</style>
