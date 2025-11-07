<template>
  <div :class="$style.home">
    <TopGamesCarousel
      :slides="carouselSlides"
      :class="$style['home__games-carousel']"
      :should-start-auto-play="true"
    />
    <template v-for="gameDetail in gameDetails" :key="gameDetail">
      <GameTile
        :class="$style['home__game-tile']"
        :tile="gameDetail"
        :currency="currency"
      />
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
    platform: "apple",
    imagePath: "Cyberpunk2077.jpg",
    title: "CyberPunk 2077",
    price: 159.99,
    discountInPercentage: 0,
    reviews: 2137,
    star: 3,
    description:
      "Cyberpunk 2077 is an open-world, action-adventure RPG" +
      " set in the dystopian metropolis of Night City, a place obsessed with power," +
      ' glamour, and body modification. Players take on the role of "V" a mercenary' +
      " outlaw whose life is upended after a heist goes wrong. V becomes entangled wit" +
      "h a legendary rock star, Johnny Silverhand, whose digital ghost is now trapped inside" +
      " V's mind via an experimental biochip. The main goal is to find a way to remove the" +
      " chip and save V's life before it's overwritten, all while trying to build a legend in " +
      "a world where corporate power is absolute and the line between human and machine " +
      "is increasingly blurred.",
  },

  {
    genres: [{ name: "Adventure" }, { name: "RRRR" }],
    platform: "playstation",
    imagePath: "TombRaider.jpg",
    title: "TombRaider",
    price: 99.99,
    discountInPercentage: 99.99,
    reviews: 100,
    star: 5,
    description:
      "Tomb Raider is a media franchise centered on the adventures of the archaeologist" +
      " Lara Croft, featuring video games, films, and comics." +
      " The franchise's video games are primarily action-adventure titles that involve" +
      " exploration, puzzle-solving, and combat in dangerous environments.",
  },

  {
    genres: [{ name: "Adventure" }, { name: "Adult" }],
    platform: "playstation",
    imagePath: "Witcher_3.jpg",
    title: "The Witcher 3",
    price: 59.99,
    reviews: 10000,
    star: 4,
    description:
      "An open-world action role-playing game where you play as Geralt of Rivia," +
      " a monster slayer for hire, searching for his adopted daughter Ciri who is being" +
      " pursued by the Wild Hunt. The game is set in a vast, morally-grey fantasy world" +
      " inspired by Slavic folklore, where players make choices with far-reaching consequences" +
      ", engage in combat with monsters and humans using weapons and magic, and can explore" +
      " a massive open world filled with quests and other activities like Gwent or horse" +
      " racing",
  },
];

const currency = "PLN";
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
    margin-bottom: 50px;
  }
}
</style>
