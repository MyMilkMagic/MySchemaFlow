<script lang="ts" setup>
import SharedUndoIcon from '@components/Shared/Icons/SharedUndoIcon.vue';
import BaseNeutralButton from '@components/Modules/Toolbar/Partials/BaseActionButton.vue';
</script>
<template>
  <BaseNeutralButton disabled>
    <SharedUndoIcon />
    <template #tooltip>Undo Action</template>
  </BaseNeutralButton>
</template>
