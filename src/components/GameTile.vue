<script setup>
import { ref, defineProps } from "vue";
const gameTileTitle = ref("Game");

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  genres: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div :class="$style['game-tile']">
    <img
      :class="$style['game-tile__image']"
      :src="require('@/assets/Cyberpunk2077.jpg')"
      :alt="gameTileTitle"
    />
    <div :class="[$style.content, $style['game-tile__content']]">
      <div :class="$style['content__title']">CYBERPUNK 2077</div>
      <div :class="$style['content__genres']">
        <template v-for="index in genres" :key="index">
          <div :class="$style['content__genre']">{{ index.name }}</div>
        </template>
      </div>
      <div :class="$style['content__description']">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        imperdiet aliquet urna, nec posuere dui efficitur in. Nam cursus dapibus
        est, quis laoreet tellus viverra nec. Fusce nec libero enim. Vestibulum
        non porttitor velit... Read more
      </div>
    </div>
    <div :class="[$style.cart, $style['game-tile__cart']]">
      <h1 :class="[$style['cart__price']]">PLN 159.99</h1>
      <div :class="$style['cart__rate']">
        <div :class="$style['cart__rate--stars']">
          <img
            :class="$style['cart__rate--icon']"
            :src="require('@/assets/GameTile/star.png')"
            alt="Star icon"
          />
          <img
            :class="$style['cart__rate--icon']"
            :src="require('@/assets/GameTile/star.png')"
            alt="Star icon"
          />
        </div>
        <h1 :class="$style['cart__rate--reviews']">2137 reviews</h1>
      </div>
      <div :class="$style['cart__button']">
        <button type="button" :class="$style['cart__button--default']">
          <img
            :class="$style['cart__button--icon']"
            :src="require('@/assets/GameTile/shopping-cart_white.png')"
            alt="Shopping cart icon"
          />
          <h1 :class="$style['cart__button--text']">ADD TO CART</h1>
        </button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.game-tile {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 1200px;
  height: 250px;
  border-radius: 10px;
  background-color: #f5f5f5;

  &__image {
    object-fit: cover;
    max-width: 214px;
    height: 250px;
    border-right: 2px black solid;
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__cart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.content {
  &__title {
    width: 100%;
    display: flex;
    justify-content: start;
    padding: 20px 0 0 20px;
    font-weight: bold;
    font-size: 2rem;
    font-family: Inter, serif;
  }

  &__genres {
    width: 100%;
    height: 33px;
    padding: 10px 10px 20px 20px;
    gap: 10px;
    flex-direction: row;
    display: flex;
  }

  &__genre {
    width: 130px;
    height: 30px;
    display: flex;
    background: #c2a875;
    color: #f5f5f5;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  &__description {
    width: 700px;
    display: flex;
    height: 100%;
    padding: 20px 45px 70px 20px;
  }
}

.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 250px;

  &__price {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    margin: 30px 20px 0 15px;
    padding: 0 20px 0 0;
  }

  &__rate {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    height: 200px;
    padding: 15px 20px 20px 20px;
    margin: 0 0 0 0;

    &--icon {
      max-width: 30px;
      max-height: 30px;
    }

    &--stars {
      display: flex;
      flex-direction: row;
    }

    &--reviews {
      display: flex;
      justify-content: end;
      width: 100%;
      height: 20px;
      text-align: start;
      font-size: 1rem;
      font-family: Inter, serif;
      font-weight: normal;
      margin: 5px 0 0 0;
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    margin: 0 20px 20px 0;

    &--default {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 40px;
      border: none;
      border-radius: 10px;
      background-color: #0073e5;
      color: #f5f5f5;
    }

    &--icon {
      object-fit: cover;
      width: 30px;
      height: 30px;
      gap: 20px;
    }

    &--text {
      font-size: 1rem;
      margin: 5px 10px 5px 10px;
      font-family: Inter, serif;
      font-weight: bold;
    }
  }
}
</style>
