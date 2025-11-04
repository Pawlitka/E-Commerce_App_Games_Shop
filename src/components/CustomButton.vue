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
});

defineEmits({
  click: {},
});

function showIcon() {
  console.log("showicon?", props.iconSource || props.iconAlternativeText);
  return props.iconSource || props.iconAlternativeText;
}

function showLabel() {
  return props.label;
}
</script>

<template>
  <button
    :class="[$style.button, $style['button--default']]"
    type="button"
    @click="$emit('click')"
  >
    <img
      v-if="showIcon()"
      :class="$style['button__icon']"
      :src="iconSource"
      :alt="iconAlternativeText"
    />
    <span v-if="showLabel()" :class="$style['button__label']">{{ label }}</span>
  </button>
</template>

<style module lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 0 20px 20px 0;

  &__icon {
    object-fit: cover;
    width: 30px;
    height: 30px;
    gap: 20px;
  }

  &__label {
    font-size: 1rem;
    margin: 5px 10px 5px 10px;
    font-family: Inter, serif;
    font-weight: bold;
  }

  &--default {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #0073e5;
    color: #f5f5f5;
  }

  &--default:hover {
    background-color: rgba(0, 115, 229, 0.8);
  }

  &--icon {
    object-fit: cover;
    width: 30px;
    height: 30px;
    gap: 20px;
  }

  &--text {
    font-size: 1rem;
    margin: 5px 10px 5px 10px;
    font-family: Inter, serif;
    font-weight: bold;
  }
}
</style>
