<script lang="ts" setup>
defineProps<{
  placeholder: string;
  id: string;
}>();
</script>
<template>
  <div>
    <label :for="id" class="cursor-pointer text-xs font-black text-blue-950">
      <slot name="label"></slot>
    </label>
    <input
      :id="id"
      class="w-full rounded border-2 border-slate-300 px-2 py-2 text-xs font-semibold text-blue-950 placeholder-slate-400 outline-none ring-0 ring-blue-500/50 transition-shadow hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-4"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>
