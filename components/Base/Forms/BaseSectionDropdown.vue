<script lang="ts" setup>
type TProps = {
  disabled?: boolean;
  items: Array<{
    name: string;
    value: string;
  }>;
};
withDefaults(defineProps<TProps>(), {
  disabled: false,
});
const { modelValue } = defineModels<{
  modelValue: string;
}>();
</script>
<template>
  <div>
    <label
      class="text-xs font-bold"
      :class="{
        'cursor-not-allowed text-slate-400': disabled,
        'cursor-pointer text-blue-950': !disabled,
      }"
    >
      <slot name="label"></slot>
    </label>
    <select
      v-model="modelValue"
      class="w-full rounded border-2 border-slate-300 px-2 py-2 text-xs font-bold outline-none"
      :class="{
        'text-blue-950 ring-0 ring-blue-500/50 transition-shadow hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-4':
          !disabled,
        'cursor-not-allowed text-slate-400': disabled,
      }"
      :disabled="disabled"
    >
      <option class="text-xs font-semibold text-slate-500" value="" disabled>
        -- Please Select --
      </option>
      <option
        v-for="(option, index) in items"
        :key="index"
        :value="option.value"
        class="text-xs font-semibold text-slate-900"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
