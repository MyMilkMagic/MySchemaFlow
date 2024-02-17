<script lang="ts" setup>
type TProps = {
  keys: Array<string>;
};
defineProps<TProps>();
</script>
<template>
  <div class="flex items-center">
    <span class="mr-1 text-xs font-bold text-slate-500">
      <slot></slot>
    </span>

    <div class="flex items-center">
      <template v-for="(key, ind) in keys" :key="key">
        <template v-if="ind !== keys.length - 1">
          <span
            class="block rounded bg-slate-200 px-1.5 py-1 font-bold text-slate-500"
            >{{ key }}</span
          >
          <span class="mx-1 block font-bold text-slate-500">+</span>
        </template>
        <span
          v-else
          class="block rounded bg-slate-200 px-1.5 py-1 font-bold text-slate-500"
          >{{ key }}</span
        >
      </template>
    </div>
  </div>
</template>
