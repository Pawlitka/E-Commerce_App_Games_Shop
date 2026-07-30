<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";
import { carouselSlides } from "@/data/mockData/mockDataCarouselSlides";
import WrapperView from "@/views/WrapperView.vue";
import { ref, onMounted } from "vue";
import { getGames } from "@/data/eCommerceAppGamesShopApi";
import { useInfiniteScroll } from "@vueuse/core";

const isElementVisible = ref(false);
const currency = "PLN";

const games = ref([]);
const page = ref(0);
const hasMore = ref(true);
const isLoading = ref(false);

const loadGames = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await getGames.fetchGamesData(page.value, 4);
    games.value.push(...response.games);
    hasMore.value = response.hasNext;
    page.value++;
  } catch (error) {
    console.error("Błąd ładowania gier:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadGames();
});

useInfiniteScroll(
  document,
  () => {
    loadGames();
  },
  { distance: 100 }
);
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

      <div :class="$style.loader">
        <p v-if="isLoading">Ładowanie kolejnych gier...</p>
        <p v-else-if="!hasMore && games.length > 0">To już wszystkie gry!</p>
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

.loader {
  padding: 20px;
  text-align: center;
}
</style>
