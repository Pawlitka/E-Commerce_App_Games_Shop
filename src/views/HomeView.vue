<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";
import { carouselSlides } from "@/data/mockData/mockDataCarouselSlides";
import { gameDetails } from "@/data/mockData/mockDataGameDetails";
import WrapperView from "@/views/WrapperView.vue";
import { ref } from "vue";

const isElementVisible = ref(false);
const currency = "PLN";
</script>

<template>
  <main :class="$style['layout']">
    <div
      v-if="isElementVisible"
      :class="$style['search-overlay']"
      @click="isElementVisible = false"
    ></div>
    <WrapperView
      :is-visible="isElementVisible"
      @update:is-visible="(val) => (isElementVisible = val)"
    >
      <div :class="$style['home']">
        <TopGamesCarousel
          :slides="carouselSlides"
          :class="$style['home__games-carousel']"
          :should-start-auto-play="true"
        />
        <template v-for="gameDetail in gameDetails" :key="gameDetail.id">
          <GameTile
            :class="$style['home__game-tile']"
            :tile="gameDetail"
            :currency="currency"
          />
        </template>
      </div>
    </WrapperView>
  </main>
</template>

<style module lang="scss">
.layout {
  position: relative;
}
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  z-index: 1;
  transition: opacity 0.3s ease;
}
.home {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__games-carousel {
    padding: 0 10px 10px 10px;
  }

  &__game-tile {
    margin-bottom: 50px;
  }
}
.blur__container {
  background-color: #878787;
}
</style>
