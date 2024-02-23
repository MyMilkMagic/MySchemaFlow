<script lang="ts" setup>
type TProps = {
  items: Array<string>;
  colorScheme?: 'danger' | 'default';
};

withDefaults(defineProps<TProps>(), {
  colorScheme: 'default',
});
</script>
<template>
  <ul
    :class="{
      'bg-rose-500 text-white': colorScheme === 'danger',
      'bg-blue-500 text-white': colorScheme === 'default',
    }"
    class="rounded p-2 text-xs font-medium"
  >
    <li v-for="item in items" :key="item" class="mb-0.5 last-of-type:mb-0">
      {{ item }}
    </li>
  </ul>
</template>
