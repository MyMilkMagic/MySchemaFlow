<script lang="ts" setup>
import BaseButton from '@components/Modules/Toolbar/Partials/BaseButton.vue';
import SharedTableIcon from '@components/Shared/Icons/SharedTableIcon.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
import BaseTooltipShortcutKey from '@components/Base/BaseTooltipShortcutKey.vue';
</script>
<template>
  <BaseButton>
    <SharedTableIcon />
    <template #tooltip>
      <BaseTooltipLabel>Create new table</BaseTooltipLabel>
      <BaseTooltipShortcutKey :keys="['Ctrl', 'Shift', 'C']" class="mt-3">
        Windows:
      </BaseTooltipShortcutKey>
      <BaseTooltipShortcutKey :keys="['⌘', 'Shift', 'C']" class="mb-1 mt-2">
        macOS:
      </BaseTooltipShortcutKey>
    </template>
  </BaseButton>
</template>
