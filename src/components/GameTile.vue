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
    <div :class="$style['game-tile_content']">
      <div :class="$style['game-tile__title']">CYBERPUNK 2077</div>
      <div :class="$style['game-tile__genres']">
        <template v-for="index in genres" :key="index">
          <div :class="$style['game-tile__genre']">{{ index.name }}</div>
        </template>
      </div>
      <div :class="$style['game-tile__description']">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        imperdiet aliquet urna, nec posuere dui efficitur in. Nam cursus dapibus
        est, quis laoreet tellus viverra nec. Fusce nec libero enim. Vestibulum
        non porttitor velit... Read more
      </div>
    </div>
    <div :class="$style['game-tile__end-part']">
      <div :class="$style['game-tile__cart']">Cart</div>
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

  &__content {
    display: flex;
  }

  &__image {
    object-fit: cover;
    width: 214px;
    height: 250px;
    border-right: 2px black solid;
  }
}
.game-tile__content--end--part {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: self-end;
}

.game-tile_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-tile__title {
  width: 100%;
  display: flex;
  justify-content: start;
  padding: 20px 0 0 20px;
  font-weight: bold;
  font-size: 2rem;
  font-family: Inter, serif;
}

.game-tile__genres {
  width: 100%;
  height: 33px;
  padding: 10px 10px 20px 20px;
  gap: 10px;
  flex-direction: row;
  display: flex;
}

.game-tile__genre {
  width: 130px;
  height: 30px;
  display: flex;
  background: #c2a875;
  color: #f5f5f5;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.game-tile__description {
  width: 700px;
  display: flex;
  height: 100%;
  padding: 20px 45px 70px 20px;
}
</style>
