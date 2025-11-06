<script setup>
import { reactive, defineProps } from "vue";
import CustomButton from "@/components/CustomButton.vue";

const props = defineProps({
  tile: {
    type: Object,
    required: true,
    default: () => null,
  },
  currency: {
    type: String,
    default: "USD",
    required: true,
  },
});

const addToCartButton = reactive({
  iconSource: require(`@/assets/GameTile/shopping-cart_white.png`),
  iconAlternativeText: "shopping-cart_white.png",
  label: "ADD TO CART",
  disabled: false,
});

function isDiscount() {
  const discountInPercentage = props.tile?.discountInPercentage ?? 0;
  return discountInPercentage > 0;
}

function discountedPrice() {
  let discountInPercentage = Math.max(
    Math.min(props.tile?.discountInPercentage, 100),
    1
  );
  return Math.max(
    props.tile?.price - (props.tile?.price * discountInPercentage) / 100,
    0.01
  ).toFixed(2);
}

function handleAddToCartButtonDisabled() {
  addToCartButton.disabled = true;
  addToCartButton.iconSource = require(`@/assets/GameTile/shopping-cart_after.png`);
  addToCartButton.iconAlternativeText = "shopping-cart_after.png";
  addToCartButton.label = "ADDED";
}
</script>

<template>
  <div :class="$style['game-tile']">
    <img
      :class="$style['game-tile__image']"
      :src="require(`@/assets/${tile.imagePath}`)"
      :alt="`Cover art for ${tile.title}`"
    />
    <div :class="[$style.content, $style['game-tile__content']]">
      <div :class="$style['content__title']">{{ tile.title }}</div>
      <div :class="$style['content__genres']">
        <template v-for="genre in tile.genres" :key="genre.name">
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
      <div v-if="isDiscount() === true" :class="$style['cart__price']">
        <span :class="[$style['cart__price__before']]"
          >{{ currency }} {{ tile.price }}</span
        >
        <span :class="[$style['cart__price__after']]"
          >{{ currency }} {{ discountedPrice() }}</span
        >
      </div>
      <div v-else :class="$style['cart__price']">
        {{ currency }} {{ tile.price }}
      </div>
      <div :class="$style['cart__rate']">
        <div :class="$style['rate__stars']">
          <img
            v-for="star in tile.star"
            :key="star"
            :class="$style['stars__icon']"
            :src="require('@/assets/GameTile/star.png')"
            alt="Star icon"
          />
        </div>
        <span :class="$style['rate__reviews']">
          {{ tile.reviews }} reviews
        </span>
      </div>
      <CustomButton
        :disabled="addToCartButton.disabled"
        :icon-source="addToCartButton.iconSource"
        :icon-alternative-text="addToCartButton.iconAlternativeText"
        :label="addToCartButton.label"
        :class="[$style['cart__button']]"
        @click="handleAddToCartButtonDisabled"
      ></CustomButton>
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
  border-radius: 5px;
  background-color: #f5f5f5;
  border: 1px #f5f5f5 solid;
  transform: scale(1);
  transition: transform 200ms ease-in-out;

  &__image {
    object-fit: cover;
    max-width: 214px;
    width: 100%;
    height: 250px;
    border-right: 2px black solid;
  }

  &__content {
    width: 85%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }

  &__cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.game-tile:hover {
  transform: scale(1.05);
  transition: transform 300ms ease-in-out;
}

.content {
  height: 250px;
  display: flex;
  padding-top: 10px;
  &__title {
    display: flex;
    padding: 5px 20px 0 20px;
    font-weight: bold;
    font-size: 2.5rem;
    font-family: Inter, serif;
    border-radius: 20px;
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
    padding: 25px 45px 70px 10px;
  }
}

.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;

  &__price {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40px;
    justify-content: flex-end;
    margin: 5px 10px 0 0;
    padding: 0 10px 0 0;
    font-family: Inter, bold, serif;
    font-size: 2rem;
    font-weight: bold;

    &__before {
      display: flex;
      justify-content: flex-end;
      font-size: 1.3rem;
      color: black;
      text-decoration: line-through;
      opacity: 0.6;
      font-weight: normal;
    }

    &__after {
      font-size: 2rem;
      font-weight: bold;
      color: green;
    }
  }

  &__rate {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 100px;
    padding: 10px 20px 0 0;
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
    margin: 10px 30px 0 0;
    padding: 5px;
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
