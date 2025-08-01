<template>
  <div class="home">
    <TopGamesCarousel
        :slides="carouselSlides"
    />
  </div>
</template>
<script>
import TopGamesCarousel from "../components/TopGamesCarousel.vue";
export default {
  name: 'HomeView',
  components: {TopGamesCarousel},
  setup() {
    // const carouselSlides = [
    //     ['Cyberpunk2077.jpg','TombRaider.jpg','Witcher_3.jpg'],
    //     ['Cyberpunk2077.jpg','Cyberpunk2077.jpg','Cyberpunk2077.jpg'],
    //     ['TombRaider.jpg','TombRaider.jpg'],
    //     ['Witcher_3.jpg','Witcher_3.jpg']
    // ];
    const carouselSlides = [
      [
        {
          imagePath: 'Cyberpunk2077.jpg',
          alternativeText: 'Image of game Cyberpunk 2077.',
        },
        {
          imagePath: 'TombRaider.jpg',
          alternativeText: 'Image of game Tomb Raider.'
        },
        {
          imagePath: 'Witcher_3.jpg',
          alternativeText: 'Image of game Witcher 3.'
        }
      ],
      [
        {
          imagePath: 'TombRaider.jpg',
          alternativeText: 'Image of game Tomb Raider.'
        },
        {
          imagePath: 'Witcher_3.jpg',
          alternativeText: 'Image of game Witcher 3.'
        },
        {
          imagePath: 'Cyberpunk2077.jpg',
          alternativeText: 'Image of game Cyberpunk 2077.'
        }
      ],
          [
          {
            imagePath: 'Cyberpunk2077.jpg',
            alternativeText: 'Image of game Cyberpunk 2077.',
          },
              {
                imagePath: 'TombRaider.jpg',
                alternativeText: 'Image of game Tomb Raider.'
              },
              {
                imagePath: 'Witcher_3.jpg',
                alternativeText: 'Image of game Witcher 3.'
              }
          ],
      [
        {
          imagePath: 'TombRaider.jpg',
          alternativeText: 'Image of game Tomb Raider.'
        },
        {
          imagePath: 'Witcher_3.jpg',
          alternativeText: 'Image of game Witcher 3.'
        },
        {
          imagePath: 'Cyberpunk2077.jpg',
          alternativeText: 'Image of game Cyberpunk 2077.'
        }
      ]
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