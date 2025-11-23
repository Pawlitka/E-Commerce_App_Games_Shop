<script setup>
import { onMounted, defineProps, ref, onUnmounted, watch, computed } from "vue";

const props = defineProps({
  shouldStartAutoPlay: {
    type: Boolean,
    default: true,
  },
  timeoutInMilliseconds: {
    type: Number,
    default: 5000,
  },
  showNavigation: {
    type: Boolean,
    default: true,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  slides: {
    type: Array,
    required: true,
  },
});

const currentSlidesIndex = ref(0);
const isAutoplayActive = ref(props.shouldStartAutoPlay);

const currentSlideGroup = computed(() => {
  return props.slides[currentSlidesIndex.value] || [];
});
const totalSlides = computed(() => props.slides.length);

watch(
  () => props.shouldStartAutoPlay,
  (newValue) => {
    isAutoplayActive.value = newValue;
    if (newValue) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  }
);

let autoplayIntervalId = null;

onMounted(startAutoPlay);

onUnmounted(stopAutoPlay);

function nextSlide() {
  if (totalSlides.value > 0) {
    currentSlidesIndex.value =
      (currentSlidesIndex.value + 1) % totalSlides.value;
  }
}

function prevSlide() {
  if (totalSlides.value > 0) {
    currentSlidesIndex.value =
      (currentSlidesIndex.value + totalSlides.value - 1) % totalSlides.value;
  }
}

function goToSlide(index) {
  currentSlidesIndex.value = index;
}

function startAutoPlay() {
  stopAutoPlay();
  if (props.shouldStartAutoPlay) {
    autoplayIntervalId = setInterval(() => {
      if (isAutoplayActive.value) {
        nextSlide();
      }
    }, props.timeoutInMilliseconds);
  }
}

function stopAutoPlay() {
  if (autoplayIntervalId) {
    clearInterval(autoplayIntervalId);
    autoplayIntervalId = null;
  }
}

const pauseAutoPlay = () => {
  isAutoplayActive.value = false;
};

const resumeAutoPlay = () => {
  if (props.shouldStartAutoPlay) {
    isAutoplayActive.value = true;
  }
};
</script>

<template>
  <div :class="$style.carousel">
    <div :class="[$style.content, $style['carousel__content']]">
      <template v-if="showNavigation">
        <div
          :class="[
            $style['content__arrow-box'],
            $style['content__arrow-box--left'],
          ]"
          @click="prevSlide"
        >
          <img
            :class="[$style.arrow_img, $style['content__arrow-box--arrow-img']]"
            :src="require(`@/assets/Carousel/arrow_white.png`)"
            alt="Previous slide arrow icon"
          />
        </div>
      </template>
      <div
        :class="[$style.slides, $style['content__slides']]"
        @mouseenter="pauseAutoPlay"
        @mouseleave="resumeAutoPlay"
      >
        <template v-for="slide in currentSlideGroup" :key="slide.imagePath">
          <div :class="[$style.slide, $style['slides__slide']]">
            <img
              :class="$style['slide__image']"
              :src="require(`@/assets/${slide.imagePath}`)"
              :alt="slide.alternativeText"
            />
          </div>
        </template>
      </div>
      <template v-if="showNavigation">
        <div
          :class="[
            $style['content__arrow-box'],
            $style['content__arrow-box--right'],
          ]"
          @click="nextSlide"
        >
          <img
            :class="[$style.arrow_img, $style['content__arrow-box--arrow-img']]"
            :src="require(`@/assets/Carousel/arrow_white.png`)"
            alt="Next slide arrow icon"
          />
        </div>
      </template>
    </div>
    <div
      v-if="showPagination"
      :class="[$style.pagination, $style['carousel__pagination']]"
    >
      <span
        v-for="(slide, index) in slides"
        :key="slide"
        :class="[
          $style['pagination__dot'],
          {
            [$style['pagination__dot--active']]: index === currentSlidesIndex,
          },
        ]"
        @click="goToSlide(index)"
      >
      </span>
    </div>
  </div>
</template>

<style module lang="scss">
.carousel {
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  display: flex;
  align-items: center;

  &__arrow-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #0073e5;
    cursor: pointer;

    &--right {
      transform: scaleX(-1);
      margin: 50px 0 50px 50px;
    }

    &--left {
      margin: 50px 50px 50px 0;
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

.slides::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  margin: -2%;
  filter: blur(20px);
  background-color: rgba(194, 215, 236, 0.75);
}

.slide {
  transform: scale(1);
  transition: transform 200ms ease-in-out;

  &__image {
    object-fit: cover;
    width: 230px;
    height: 330px;
    border-radius: 12px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  }
}

.slide:hover {
  transform: scale(1.05);
  transition: transform 300ms ease-in-out;
}

.arrow_img {
  width: 25%;
  height: 30%;
}

.pagination {
  margin-bottom: 30px;
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
    background-color: #92bfeb;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.25);

    &--active {
      background-color: #0073e5;
    }
  }
}
</style>
