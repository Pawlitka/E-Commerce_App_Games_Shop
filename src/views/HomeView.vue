<template>
  <div :class="$style.home">
    <TopGamesCarousel
      :slides="carouselSlides"
      :class="$style['home__games-carousel']"
      :should-start-auto-play="true"
    />
    <template v-for="gameDetail in gameDetails" :key="gameDetail">
      <GameTile :class="$style['home__game-tile']" :tile="gameDetail" />
    </template>
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
  ],
];

const gameDetails = [
  {
    genres: [
      { name: "Adventure" },
      { name: "RPG" },
      { name: "CO-OP" },
      { name: "Horror" },
    ],
    imagePath: "Cyberpunk2077.jpg",
    title: "CyberPunk 2077",
    price: "PLN 159.99",
    discount: "PLN 69.99",
    reviews: "2137",
    star: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
      "        imperdiet aliquet urna, nec posuere dui efficitur in. Nam cursus dapibus\n" +
      "        est, quis laoreet tellus viverra nec. Fusce nec libero enim. Vestibulum\n" +
      "        non porttitor velit... Read more",
  },

  {
    genres: [{ name: "Adventure" }, { name: "RRRR" }],
    imagePath: "TombRaider.jpg",
    title: "TombRaider",
    price: "PLN 99.99",
    discount: "PLN 19.99",
    reviews: "100",
    star: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
      "        imperdiet aliquet urna, nec posuere dui efficitur in. Nam cursus dapibus\n" +
      "        est, quis laoreet tellus viverra nec. Fusce nec libero enim. Vestibulum\n" +
      "        non porttitor velit... Read more",
  },

  {
    genres: [{ name: "Adventure" }, { name: "Adult" }],
    imagePath: "Witcher_3.jpg",
    title: "The Witcher 3",
    price: "PLN 59.99",
    reviews: "10000",
    star: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
      "        imperdiet aliquet urna, nec posuere dui efficitur in. Nam cursus dapibus\n" +
      "        est, quis laoreet tellus viverra nec. Fusce nec libero enim. Vestibulum\n" +
      "        non porttitor velit... Read more",
  },
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
    margin-bottom: 80px;
  }
}
</style>
