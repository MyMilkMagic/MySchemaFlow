<script setup lang="ts">
import SharedSettingsIcon from '@components/Shared/Icons/SharedSettingsIcon.vue';
import BaseButton from '@components/Modules/Toolbar/Partials/BaseButton.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
</script>

<template>
  <BaseButton>
    <SharedSettingsIcon />

    <template #tooltip>
      <BaseTooltipLabel>Settings</BaseTooltipLabel>
    </template>
  </BaseButton>
</template>
