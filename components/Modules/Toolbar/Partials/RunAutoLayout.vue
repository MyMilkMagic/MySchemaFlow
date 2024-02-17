<script lang="ts" setup>
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';
import SharedChevronIcon from '@components/Shared/Icons/SharedChevronIcon.vue';
import SharedHorizontalOrientationIcon from '@components/Shared/Icons/SharedHorizontalOrientationIcon.vue';
</script>
<template>
  <div class="flex overflow-hidden rounded">
    <BaseTooltipWithShortcutKeys>
      <button
        type="button"
        class="flex h-[30px] w-[40px] items-center justify-center bg-slate-300 stroke-slate-600 p-3.5 outline-none hover:bg-blue-500 hover:stroke-white"
      >
        <SharedHorizontalOrientationIcon />
      </button>

      <template #tooltip>
        <slot name="tooltip">
          <BaseTooltipLabel>Run AutoLayout</BaseTooltipLabel>
        </slot>
      </template>
    </BaseTooltipWithShortcutKeys>
    <BaseTooltipWithShortcutKeys>
      <button
        type="button"
        class="flex h-[30px] w-[30px] items-center justify-center bg-slate-200 stroke-slate-600 p-2.5 outline-none hover:bg-blue-100 hover:stroke-blue-500"
      >
        <SharedChevronIcon />
      </button>

      <template #tooltip>
        <slot name="tooltip">
          <BaseTooltipLabel>Change Layout</BaseTooltipLabel>
        </slot>
      </template>
    </BaseTooltipWithShortcutKeys>
  </div>
</template>
