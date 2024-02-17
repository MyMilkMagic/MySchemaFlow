<script lang="ts" setup>
import SharedRedoIcon from '@components/Shared/Icons/SharedRedoIcon.vue';
import BaseNeutralButton from '@components/Modules/Toolbar/Partials/BaseActionButton.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
import BaseTooltipShortcutKey from '@components/Base/BaseTooltipShortcutKey.vue';
</script>
<template>
  <BaseNeutralButton>
    <SharedRedoIcon />
    <template #tooltip>
      <BaseTooltipLabel>Redo</BaseTooltipLabel>
      <BaseTooltipShortcutKey :keys="['Ctrl', 'Y']" class="mt-3">
        Windows:
      </BaseTooltipShortcutKey>
      <BaseTooltipShortcutKey :keys="['⌘', 'Y']" class="mb-1 mt-2">
        macOS:
      </BaseTooltipShortcutKey>
    </template>
  </BaseNeutralButton>
</template>
