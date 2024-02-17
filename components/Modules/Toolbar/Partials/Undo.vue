<script lang="ts" setup>
import SharedUndoIcon from '@components/Shared/Icons/SharedUndoIcon.vue';
import BaseNeutralButton from '@components/Modules/Toolbar/Partials/BaseActionButton.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
import BaseTooltipShortcutKey from '@components/Base/BaseTooltipShortcutKey.vue';
</script>
<template>
  <BaseNeutralButton disabled>
    <SharedUndoIcon />
    <template #tooltip>
      <BaseTooltipLabel>Undo</BaseTooltipLabel>
      <BaseTooltipShortcutKey :keys="['Ctrl', 'Z']" class="mt-1">
        Windows:
      </BaseTooltipShortcutKey>
      <BaseTooltipShortcutKey :keys="['⌘', 'Z']" class="mt-1">
        macOS:
      </BaseTooltipShortcutKey>
    </template>
  </BaseNeutralButton>
</template>
