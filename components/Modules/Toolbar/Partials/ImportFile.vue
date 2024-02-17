<script lang="ts" setup>
import SharedImportIcon from '@components/Shared/Icons/SharedImportIcon.vue';
import BaseButton from '@components/Modules/Toolbar/Partials/BaseButton.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
</script>
<template>
  <BaseButton>
    <SharedImportIcon />
    <template #tooltip>
      <BaseTooltipLabel>Import File</BaseTooltipLabel>
    </template>
  </BaseButton>
</template>
