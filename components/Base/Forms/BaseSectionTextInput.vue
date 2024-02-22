<script lang="ts" setup>
defineProps<{
  placeholder: string;
  id: string;
}>();
const { modelValue } = defineModels<{
  modelValue: string | number | boolean;
}>();
const emits = defineEmits<{
  (e: 'onFocus', value: Event): void;
  (e: 'onBlur', value: Event): void;
  (e: 'onKeydown', value: KeyboardEvent): void;
  (e: 'onKeyup', value: KeyboardEvent): void;
}>();
</script>
<template>
  <div>
    <label :for="id" class="cursor-pointer text-xs font-bold text-blue-950">
      <slot name="label"></slot>
    </label>
    <input
      :id="id"
      v-model="modelValue"
      class="w-full rounded border-2 border-slate-300 px-2 py-2 text-xs font-bold text-blue-950 placeholder-slate-400 outline-none ring-0 ring-blue-500/50 transition-shadow hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-4"
      type="text"
      :placeholder="placeholder"
      @focus="emits('onFocus', $event)"
      @blur="emits('onBlur', $event)"
      @keyup="emits('onKeyup', $event)"
      @keydown="emits('onKeydown', $event)"
    />
  </div>
</template>
