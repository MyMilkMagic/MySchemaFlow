<script lang="ts" setup>
import SharedExportIcon from '@components/Shared/Icons/SharedExportIcon.vue';
import BaseButton from '@components/Modules/Toolbar/Partials/BaseButton.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
</script>
<template>
  <BaseButton>
    <SharedExportIcon />
    <template #tooltip>
      <BaseTooltipLabel>Export File</BaseTooltipLabel>
    </template>
  </BaseButton>
</template>
