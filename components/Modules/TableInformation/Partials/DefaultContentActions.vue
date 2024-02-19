<script lang="ts" setup>
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import SharedCloneIcon from '@components/Shared/Icons/SharedCloneIcon.vue';
import SharedTrashIcon from '@components/Shared/Icons/SharedTrashIcon.vue';
import BaseSectionActionButtonIcon from '@components/Base/Forms/BaseSectionActionButtonIcon.vue';
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
</script>
<template>
  <div class="flex">
    <BaseTooltipWithShortcutKeys class="mr-1">
      <BaseSectionActionButtonIcon>
        <SharedAddIcon />
      </BaseSectionActionButtonIcon>
      <template #tooltip>
        <BaseTooltipLabel>Add Column</BaseTooltipLabel>
      </template>
    </BaseTooltipWithShortcutKeys>
    <BaseTooltipWithShortcutKeys class="mr-1">
      <BaseSectionActionButtonIcon :disabled="true">
        <SharedCloneIcon />
      </BaseSectionActionButtonIcon>
      <template #tooltip>
        <BaseTooltipLabel>Clone Column</BaseTooltipLabel>
      </template>
    </BaseTooltipWithShortcutKeys>
    <BaseTooltipWithShortcutKeys class="mr-1">
      <BaseSectionActionButtonIcon :disabled="true" color-scheme="danger">
        <SharedTrashIcon />
      </BaseSectionActionButtonIcon>
      <template #tooltip>
        <BaseTooltipLabel>Delete Column</BaseTooltipLabel>
      </template>
    </BaseTooltipWithShortcutKeys>
  </div>
</template>
