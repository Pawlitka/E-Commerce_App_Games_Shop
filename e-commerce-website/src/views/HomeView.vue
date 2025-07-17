<template>
  <div class="home">
    <TopGamesCarousel
        :navigation="true"
        :pagination="true"
        :startAutoPlay="false"
        :timeout="5000"
        :carouselSlides="carouselSlides"
    />
  </div>
</template>

<script>
import TopGamesCarousel from "../components/TopGamesCarousel.vue";

export default {
  name: 'HomeView',
  components: {TopGamesCarousel},

  setup() {
    const carouselSlides = [
        ['Cyberpunk2077.jpg','TombRaider.jpg','Witcher_3.jpg'],
        ['Cyberpunk2077.jpg','Cyberpunk2077.jpg','Cyberpunk2077.jpg'],
        ['TombRaider.jpg','TombRaider.jpg'],
        ['Witcher_3.jpg','Witcher_3.jpg']
    ];
    return { carouselSlides };
  }
}
</script>

<style lang="scss" scoped>

.home {
  height: 100%;
  display: flex;
  justify-content: center;
}

</style>
