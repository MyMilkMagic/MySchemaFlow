<script lang="ts" setup>
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';
</script>
<template>
  <BaseTooltipWithShortcutKeys>
    <button
      type="button"
      class="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white stroke-slate-900 p-1.5 outline-none hover:bg-blue-100 hover:stroke-blue-500"
    >
      <slot></slot>
    </button>

    <template #tooltip>
      <slot name="tooltip"></slot>
    </template>
  </BaseTooltipWithShortcutKeys>
</template>
