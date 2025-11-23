<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";
import { carouselSlides } from "@/data/mockData/mockDataCarouselSlides";
import { gameDetails } from "@/data/mockData/mockDataGameDetails";
import HeaderBar from "@/components/HeaderBar.vue";

const currency = "PLN";
</script>

<template>
  <div :class="$style.home">
    <HeaderBar :class="$style['home__header-bar']" :show-navigation="true" />
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
</template>

<style module lang="scss">
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__header-bar {
    position: sticky;
    top: 0;
    margin-bottom: 20px;
    z-index: 1;
  }

  &__games-carousel {
    padding: 0 10px 10px 10px;
  }

  &__game-tile {
    margin-bottom: 50px;
  }
}
</style>
