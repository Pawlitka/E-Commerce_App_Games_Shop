<script setup>
import { ref, defineProps } from "vue";
const gameTileTitle = ref("Game");

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tile: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>

<template>
  <div :class="$style['game-tile']">
    <img
      :class="$style['game-tile__image']"
      :src="require(`@/assets/${tile.imagePath}`)"
      :alt="gameTileTitle"
    />
    <div :class="[$style.content, $style['game-tile__content']]">
      <div :class="$style['content__title']">{{ tile.title }}</div>
      <div :class="$style['content__genres']">
        <template v-for="genre in tile.genres" :key="genre">
          <div :class="$style['genres__genre']">
            {{ genre.name }}
          </div>
        </template>
      </div>

      <div :class="$style['content__description']">
        {{ tile.description }}
      </div>
    </div>
    <div :class="[$style.cart, $style['game-tile__cart']]">
      <span :class="[$style['cart__price']]">{{ tile.price }}</span>
      <div :class="$style['cart__rate']">
        <div :class="$style['rate__stars']">
          <img
            :class="$style['stars__icon']"
            :src="require('@/assets/GameTile/star.png')"
            alt="Star icon"
          />
          <img
            :class="$style['stars__icon']"
            :src="require('@/assets/GameTile/star.png')"
            alt="Star icon"
          />
        </div>
        <span :class="$style['rate__reviews']">
          {{ tile.reviews }}
        </span>
      </div>
      <!-- TODO Start CommerceButton (:iconSource, :iconAlternativeText :label, @click)-->
      <div :class="$style['cart__button']">
        <button type="button" :class="$style['cart__button--default']">
          <img
            :class="$style['button__icon']"
            :src="require('@/assets/GameTile/shopping-cart_white.png')"
            alt="Shopping cart icon"
          />
          <span :class="$style['cart__button--text']">ADD TO CART</span>
        </button>
      </div>
      <!--      END COMMERCEBUTTON-->
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
  display: flex;
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
    font-family: Inter, serif;
    font-size: 1.8rem;
    font-weight: bold;
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

    &__reviews {
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

    &--default:hover {
      background-color: rgba(0, 115, 229, 0.8);
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

.button {
  &__icon {
    max-width: 30px;
    max-height: 30px;
  }
}

.rate {
  &__stars {
    display: flex;
    flex-direction: row;
  }
}

.stars {
  &__icon {
    max-width: 30px;
    max-height: 30px;
  }
}

.genres {
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
}
</style>
