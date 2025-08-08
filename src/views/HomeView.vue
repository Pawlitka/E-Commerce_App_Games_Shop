<template>
  <div :class="$style.home">
    <TopGamesCarousel
      :slides="carouselSlides"
      :class="$style['home__games-carousel']"
    />
    <GameTile :genres="genre" :class="$style['home__game-tile']" />
  </div>
</template>

<script setup>
import TopGamesCarousel from "@/components/TopGamesCarousel.vue";
import GameTile from "@/components/GameTile.vue";

const carouselSlides = [
  [
    {
      imagePath: "Cyberpunk2077.jpg",
      alternativeText: "Image of game Cyberpunk 2077.",
    },
    {
      imagePath: "TombRaider.jpg",
      alternativeText: "Image of game Tomb Raider.",
    },
    {
      imagePath: "Witcher_3.jpg",
      alternativeText: "Image of game Witcher 3.",
    },
  ],
  [
    {
      imagePath: "TombRaider.jpg",
      alternativeText: "Image of game Tomb Raider.",
    },
    {
      imagePath: "Witcher_3.jpg",
      alternativeText: "Image of game Witcher 3.",
    },
    {
      imagePath: "Cyberpunk2077.jpg",
      alternativeText: "Image of game Cyberpunk 2077.",
    },
  ],
  [
    {
      imagePath: "Cyberpunk2077.jpg",
      alternativeText: "Image of game Cyberpunk 2077.",
    },
    {
      imagePath: "TombRaider.jpg",
      alternativeText: "Image of game Tomb Raider.",
    },
    {
      imagePath: "Witcher_3.jpg",
      alternativeText: "Image of game Witcher 3.",
    },
  ],
  [
    {
      imagePath: "TombRaider.jpg",
      alternativeText: "Image of game Tomb Raider.",
    },
    {
      imagePath: "Witcher_3.jpg",
      alternativeText: "Image of game Witcher 3.",
    },
    {
      imagePath: "Cyberpunk2077.jpg",
      alternativeText: "Image of game Cyberpunk 2077.",
    },
    {
      imagePath: "Cyberpunk2077.jpg",
      alternativeText: "Image of game Cyberpunk 2077.",
    },
  ],
];

const genre = [
  { name: "Adventure" },
  { name: "RPG" },
  { name: "CO-OP" },
  { name: "Horror" },
];
</script>

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
    padding: 10px 10px 10px 10px;
  }
}
</style>
