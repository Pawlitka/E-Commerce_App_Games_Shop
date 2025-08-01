<template>
  <div class="home">
    <TopGamesCarousel :slides="carouselSlides" />
  </div>
</template>

<script setup>
import TopGamesCarousel from "../components/TopGamesCarousel.vue";

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
  ],
];
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
