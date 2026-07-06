<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";
import { carouselSlides } from "@/data/mockData/mockDataCarouselSlides";
import WrapperView from "@/views/WrapperView.vue";
import { onMounted, ref } from "vue";
import { getGames } from "@/data/eCommerceAppGamesShopApi";
const currency = "PLN";

const games = ref([]);
const loading = ref(true);
const error = ref(null);

const loadGames = async () => {
  try {
    loading.value = true;
    const response = await getGames.fetchGamesData();

    games.value = response;
  } catch (err) {
    error.value = "Nie udało się pobrać gier.";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadGames();
});
</script>

<template>
  <WrapperView>
    <div :class="$style.home">
      <TopGamesCarousel
        :slides="carouselSlides"
        :class="$style['home__games-carousel']"
        :should-start-auto-play="true"
      />
      <template v-for="game in games" :key="game.id">
        <GameTile
          :class="$style['home__game-tile']"
          :currency="currency"
          :tile="game"
        />
      </template>
    </div>
  </WrapperView>
</template>

<style module lang="scss">
.home {
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
</style>
