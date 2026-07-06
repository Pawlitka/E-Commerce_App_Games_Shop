<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";
import { carouselSlides } from "@/data/mockData/mockDataCarouselSlides";
import WrapperView from "@/views/WrapperView.vue";
import { onMounted, ref } from "vue";
import { getGames } from "@/data/eCommerceAppGamesShopApi";

const isElementVisible = ref(false);
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
        <template v-for="game in games" :key="game.id">
          <GameTile
            :class="$style['home__game-tile']"
            :tile="game"
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
