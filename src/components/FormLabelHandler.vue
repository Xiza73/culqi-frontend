<script setup lang="ts">
import { regexInputHandler } from "../utils/helpers";

const props = defineProps<{
  modelValue: string;
  handleChange: (value: string) => void;
  regex?: RegExp;
  regexFunction?: (value: string) => string;
  label?: string;
  name: string;
  placeholder: string;
  type: string;
  error?: boolean;
  errorMessage?: string;
}>();

const { handleChange, regex, regexFunction } = props;

const handleInput = (event: Event) => {
  const value = regexInputHandler((event.target as HTMLInputElement).value, {
    regex,
    regexFunction,
  });

  (event.target as HTMLInputElement).value = value;
  handleChange(value);
};
</script>

<template>
  <div class="mb-4">
    <label
      for="username"
      class="block text-white-400 text-sm font-bold mb-2"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :name="name"
      :id="name"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      class="shadow appearance-none border rounded border-white-300 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
    />
    <p class="text-orange-300 text-xs italic" v-if="!modelValue && error">
      *{{ errorMessage }}
    </p>
  </div>
</template>
