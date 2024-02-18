<script setup lang="ts">
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';
import BaseFloatingLayout from '@components/Base/BaseFloatingLayout.vue';
import SharedChevronIcon from '@components/Shared/Icons/SharedChevronIcon.vue';
import RunAutoLayoutDropdownButton from '@components/Modules/Toolbar/Partials/RunAutoLayoutDropdownButton.vue';
import SharedHorizontalOrientationIcon from '@components/Shared/Icons/SharedHorizontalOrientationIcon.vue';
import SharedVerticalOrientationIcon from '@components/Shared/Icons/SharedVerticalOrientationIcon.vue';
import { useSettingsStore } from '@stores/Settings';
import { useNodeAutoLayout } from '@composables/Nodes/useNodeAutoLayout';

const settingsStore = useSettingsStore();
const showLayout = ref(false);
const autoLayoutDropdownBtn = ref<HTMLButtonElement>();
const autoLayoutDropdown =
  ref<InstanceType<typeof BaseTooltipWithShortcutKeys>>();
const { autoLayout } = useNodeAutoLayout();
const onClickToggleLayout = () => {
  if (!autoLayoutDropdown.value) return;
  showLayout.value = !showLayout.value;
  autoLayoutDropdown.value.showTooltip = !showLayout.value;
};
const onClickRunAutoLayout = (orientation: 'TB' | 'LR') => {
  settingsStore.currentOrientation = orientation;
  autoLayout();
};
onClickOutside(autoLayoutDropdownBtn, () => {
  showLayout.value = false;
});
</script>

<template>
  <BaseFloatingLayout :show-layout="showLayout">
    <BaseTooltipWithShortcutKeys ref="autoLayoutDropdown">
      <button
        ref="autoLayoutDropdownBtn"
        type="button"
        class="flex h-[30px] w-[30px] items-center justify-center bg-slate-200 stroke-slate-600 p-2.5 outline-none hover:bg-slate-300/80"
        @click="onClickToggleLayout"
      >
        <SharedChevronIcon />
      </button>

      <template #tooltip>
        <slot name="tooltip">
          <BaseTooltipLabel>Change Layout</BaseTooltipLabel>
        </slot>
      </template>
    </BaseTooltipWithShortcutKeys>
    <template #layout>
      <RunAutoLayoutDropdownButton
        :is-active="settingsStore.currentOrientation === 'TB'"
        @click="onClickRunAutoLayout('TB')"
      >
        <template #icon>
          <SharedVerticalOrientationIcon />
        </template>
        <template #text>Vertical Layout</template>
      </RunAutoLayoutDropdownButton>
      <RunAutoLayoutDropdownButton
        :is-active="settingsStore.currentOrientation === 'LR'"
        @click="onClickRunAutoLayout('LR')"
      >
        <template #icon>
          <SharedHorizontalOrientationIcon />
        </template>
        <template #text>Horizontal Layout</template>
      </RunAutoLayoutDropdownButton>
    </template>
  </BaseFloatingLayout>
</template>
