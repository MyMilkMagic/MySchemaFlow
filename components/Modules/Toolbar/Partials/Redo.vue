<script lang="ts" setup>
import BaseNeutralButton from '@components/Modules/Toolbar/Partials/BaseActionButton.vue';
import SharedRedoIcon from '@components/Shared/Icons/SharedRedoIcon.vue';
</script>
<template>
  <BaseNeutralButton type="button">
    <SharedRedoIcon />
    <template #tooltip>Redo Action</template>
  </BaseNeutralButton>
</template>
