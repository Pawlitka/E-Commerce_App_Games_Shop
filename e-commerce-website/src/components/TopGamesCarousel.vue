<script>
import { ref } from "vue";
export default {
  props: ["startAutoPlay", "timeout", "navigation", "pagination", "carouselSlides"],
  setup(props) {
    const carouselSlidesRef = ref(props.carouselSlides ? [] : props.carouselSlides);
    const currentSubSlidesIndex = ref(0);
    const autoPlayEnabled = ref(props.startAutoPlay  ? true : props.startAutoPlay);
    const timeOutDuration = ref(props.timeout  ? 5000 : props.timeout);
    const paginationEnabled = ref(props.pagination  ? true : props.pagination);
    const navigationEnabled = ref(props.navigation  ? true : props.navigation);

    function nextSlides() {
      const isLastSlide = currentSubSlidesIndex.value === carouselSlidesRef.value.length - 1;
      if(isLastSlide) {
        currentSubSlidesIndex.value = 0;
      } else {
        currentSubSlidesIndex.value += 1;
      }
    }

    function prevSlides() {
      const isFirstSlide = currentSubSlidesIndex.value === 0;
      if(isFirstSlide) {
        currentSubSlidesIndex.value = carouselSlidesRef.value.length - 1;
      } else {
        currentSubSlidesIndex.value -= 1;
      }
    }

    function goToSlides(index) {
      currentSubSlidesIndex.value = index;
    }

    function autoPlay() {
      setInterval(() => {
        nextSlides();
      }, timeOutDuration.value);
    }

    if(autoPlayEnabled.value) {
      autoPlay();

    }

    return {
      carouselSlidesRef,
      currentSubSlidesIndex: currentSubSlidesIndex,
      nextSlide: nextSlides,
      prevSlide: prevSlides,
      goToSlide: goToSlides,
      paginationEnabled,
      navigationEnabled
    };
  }
}
</script>

<template>
  <div class="carousel">
    <div class="content">
      <template v-if="navigationEnabled">
        <div class="content__arrow-box" @click="prevSlide">
          <img class="arrow-img" :src="require(`../assets/Carousel/arrow_white.png`)" alt=""/>
        </div>
      </template>
        <div class="slides-background">
        </div>
        <div class="slides">
          <template v-for="(subSlides, index) in carouselSlides" :key="index">
            <template v-if="currentSubSlidesIndex === index">
              <template v-for="slide in subSlides" :key="slide">
                <div class="slides__slide slide">
                  <img class="slide__image" :src="require(`../assets/${slide}`)" alt="">
                </div>
              </template>
            </template>
          </template>
        </div>
      <template v-if="navigationEnabled">
        <div class="content__arrow-box content__arrow-box--right" @click="nextSlide">
          <img class="arrow-img" :src="require(`../assets/Carousel/arrow_white.png`)" alt=""/>
        </div>
      </template>
    </div>
    <div v-if="paginationEnabled" class="carousel__pagination pagination">
        <span class="pagination__dot"
            @click="goToSlide(index)"
            v-for="(slide, index) in carouselSlides.length"
            :key="index"
            :class="{'pagination__dot--active': index === currentSubSlidesIndex}" >
        </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.carousel {
  display: flex;
  flex-direction: column;
  margin-top: 6%;

  &__pagination {
    width: 100%;
  }
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &__arrow-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #0073E5;
    margin: 50px;
    cursor: pointer;

    &--right {
      transform: scaleX(-1);
    }
  }
}

.slides {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
}

.slides-background {
  margin: 165px;
  width: 800px;
  height: 340px;
  filter: blur(20px);
  background-color: rgba(194, 215, 236, 0.75);
  position: absolute;
}

.slide {
  &__image {
    width: 230px;
    height: 330px;
    border-radius: 12px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  }
}

.arrow-img {
  width: 20px;
  height: 38px;
}

.pagination {
  gap: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__dot {
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-top: 35px;
    border-radius: 50%;
    background-color: #92BFEB;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.25);

    &--active {
      background-color: #0073E5;
    }
  }
}

</style>