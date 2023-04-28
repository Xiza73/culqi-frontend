<script setup lang="ts">
import { Color, Size, ButtonType } from "../utils/types";

defineProps<{
  color: Color;
  size: Size;
  type: ButtonType;
  text: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :type="type"
    :class="`btn_${color} btn_${size} rounded focus:outline-none focus:shadow-outline ${
      disabled ? 'btn_disabled' : ''
    }`"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
