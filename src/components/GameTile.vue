<script setup>
import { reactive, defineProps, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";

const cartIcon = {
  initial: require(`@/assets/icon/icon_shopping-cart.svg`),
  added: require(`@/assets/icon/icon_add-shopping-cart.svg`),
};
const MAX_DESCRIPTION_LENGTH = 250;

const props = defineProps({
  tile: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      genres: [
        {
          name: "Adventure",
        },
        {
          name: "RPG",
        },
      ],
      platform: "apple",
      imagePath: "Cyberpunk2077.jpg",
      title: "CyberPunk 2077",
      price: 159.99,
      discountInPercentage: 0,
      reviews: 2137,
      star: 3,
      description: "Lorem ipsum dolor sit amet",
    }),
  },
  currency: {
    type: String,
    default: "USD",
    required: true,
  },
});

const addToCartButton = reactive({
  iconSource: cartIcon.initial,
  iconAlternativeText: "Icon that shows a shopping cart.",
  label: "ADD TO CART",
  disabled: false,
});

const platformIconStyle = computed(() => {
  if (props.tile?.platform) {
    try {
      const iconUrl = require(`@/assets/logo/logo_${props.tile.platform}.svg`);
      return { "--platform-icon": `url(${iconUrl})` };
    } catch (e) {
      console.error(`Cannot load icon for platform: ${props.tile.platform}`);
      return {};
    }
  }
  return {};
});

const hasDiscount = computed(
  () => (props?.tile?.discountInPercentage ?? 0) > 0
);

const discountedPrice = computed(() => {
  if (!hasDiscount.value) return props.tile?.price.toFixed(2);

  const discount = Math.max(Math.min(props.tile?.discountInPercentage, 100), 1);
  const finalPrice = props.tile?.price - (props.tile?.price * discount) / 100;

  return Math.max(finalPrice.toFixed(2), 0.01).toFixed(2);
});

function handleAddToCartButtonClick() {
  addToCartButton.disabled = true;
  addToCartButton.iconSource = cartIcon.added;
  addToCartButton.iconAlternativeText = "Icon that shows an added to cart ";
  addToCartButton.label = "ADDED";
}

function handleNavigateToGamePage() {
  console.log("Navigate to game page");
}

function truncateDescription(text, maxLength) {
  if (text.length <= maxLength) return text;
  let truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }
  return truncated + "...";
}
</script>

<template>
  <div
    :style="platformIconStyle"
    :class="$style['game-tile']"
    @click="handleNavigateToGamePage"
  >
    <div :class="$style['game-tile__image-container']">
      <img
        :class="$style['game-tile__image']"
        :src="require(`@/assets/${tile.imagePath}`)"
        :alt="`Cover art for ${tile.title}`"
      />
    </div>
    <div :class="[$style.content, $style['game-tile__content']]">
      <div :class="$style['content__title']">{{ tile.title }}</div>
      <div :class="$style['content__genres']">
        <template v-for="genre in tile.genres" :key="genre.id">
          <div :class="$style['genres__genre']">
            {{ genre.name }}
          </div>
        </template>
      </div>

      <div :class="$style['content__description']">
        {{
          truncateDescription(props.tile?.description, MAX_DESCRIPTION_LENGTH)
        }}
        <a href="#" :class="$style['content__link']">Read more</a>
      </div>
    </div>
    <div :class="[$style.cart, $style['game-tile__cart']]">
      <div v-if="hasDiscount" :class="$style['cart__price']">
        <span :class="[$style['cart__price__before']]"
          >{{ currency }} {{ tile.price }}</span
        >
        <span :class="[$style['cart__price__after']]"
          >{{ currency }} {{ discountedPrice }}</span
        >
      </div>
      <div v-else :class="$style['cart__price']">
        {{ currency }} {{ tile.price }}
      </div>
      <div :class="$style['cart__rate']">
        <div :class="$style['rate__stars']">
          <img
            v-for="numberOfStars in tile.star"
            :key="numberOfStars"
            :class="$style['stars__icon']"
            :src="require('@/assets/icon/icon_rate-star.svg')"
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
        @click="handleAddToCartButtonClick"
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
  border-radius: 20px;
  background-color: #f5f5f5;
  transform: scale(1);
  transition: transform 200ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &__image-container {
    position: relative;
    max-width: 214px;
    width: 100%;
    height: 250px;

    &::after {
      content: "";
      background-image: var(--platform-icon);
      background-size: 35px 35px;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      background-color: rgb(245, 245, 245);
      border: 1px solid black;
      border-radius: 10px;
    }
  }

  &__image {
    object-fit: cover;
    max-width: 214px;
    width: 100%;
    height: 250px;
    border-right: 2px black solid;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
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
    position: relative;
    width: 700px;
    height: 100%;
    padding: 25px 45px 70px 10px;
  }

  &__link {
    color: #0073e5;
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
      color: rgba(0, 138, 99, 1);
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 10px;
    padding: 5px;
    margin: 0 30px 10px 0;
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
    box-shadow: 0 4px 4px 0 rgba(194, 168, 117, 0.4);
    color: #f5f5f5;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
}
</style>
