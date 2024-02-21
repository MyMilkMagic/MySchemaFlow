<script lang="ts" setup>
import SharedLeftArrowIcon from '@components/Shared/Icons/SharedLeftArrowIcon.vue';
</script>
<template>
  <button
    type="button"
    class="group flex items-center rounded bg-slate-200 px-2 py-2.5 shadow-blue-400/50 outline-none ring-0 transition-shadow hover:bg-blue-100 focus-visible:bg-blue-100 focus-visible:ring-4"
  >
    <span
      class="mr-1 flex w-[15px] stroke-slate-900 group-hover:stroke-blue-500 group-focus-visible:stroke-blue-500"
    >
      <SharedLeftArrowIcon />
    </span>
    <span
      class="text-xs font-semibold text-slate-900 group-hover:text-blue-500 group-focus-visible:text-blue-500"
      >Go Back</span
    >
  </button>
</template>
