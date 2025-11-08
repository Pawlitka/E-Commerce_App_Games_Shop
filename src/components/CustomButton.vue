<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  iconSource: {
    type: String,
    default: "",
  },
  iconAlternativeText: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      $style.button,
      $style['button--default'],
      { [$style['button--disabled']]: disabled },
    ]"
    type="button"
    @click.stop="$emit('click')"
  >
    <img
      v-if="iconSource"
      :class="$style['button__icon']"
      :src="iconSource"
      :alt="iconAlternativeText"
    />
    <span v-if="label" :class="$style['button__label']">{{ props.label }}</span>
  </button>
</template>

<style module lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;

  &__icon {
    object-fit: cover;
    width: 30px;
    height: 30px;
  }

  &__label {
    font-size: 1rem;
    margin: 5px 10px;
    font-family: Inter, serif;
    font-weight: bold;
  }

  &--default {
    background-color: #0073e5;
    color: #f5f5f5;
  }

  &--default:hover {
    background-color: rgba(0, 115, 229, 0.8);
    cursor: pointer;
  }

  &--disabled,
  &--disabled:hover {
    background-color: rgba(0, 138, 99, 1);
    cursor: default;
  }
}
</style>
