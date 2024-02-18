<script lang="ts" setup>
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';
import SharedVerticalOrientationIcon from '@components/Shared/Icons/SharedVerticalOrientationIcon.vue';
import SharedHorizontalOrientationIcon from '@components/Shared/Icons/SharedHorizontalOrientationIcon.vue';
import RunAutoLayoutDropdown from '@components/Modules/Toolbar/Partials/RunAutoLayoutDropdown.vue';
import { useSettingsStore } from '@stores/Settings';
import { useNodeAutoLayout } from '@composables/Nodes/useNodeAutoLayout';

const settingsStore = useSettingsStore();
const { autoLayout } = useNodeAutoLayout();
</script>
<template>
  <div class="flex overflow-hidden rounded">
    <BaseTooltipWithShortcutKeys>
      <button
        type="button"
        class="flex h-[30px] w-[40px] items-center justify-center bg-slate-300 stroke-slate-600 p-2 outline-none hover:bg-slate-400/60"
        @click="autoLayout"
      >
        <SharedVerticalOrientationIcon
          v-if="settingsStore.currentOrientation === 'TB'"
        />
        <SharedHorizontalOrientationIcon v-else />
      </button>

      <template #tooltip>
        <slot name="tooltip">
          <BaseTooltipLabel>Run AutoLayout</BaseTooltipLabel>
        </slot>
      </template>
    </BaseTooltipWithShortcutKeys>
    <RunAutoLayoutDropdown />
  </div>
</template>
