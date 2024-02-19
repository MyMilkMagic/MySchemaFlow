<script lang="ts" setup>
import DefaultContentTableName from '@components/Modules/TableInformation/Partials/DefaultContentTableName.vue';
import DefaultContentColumns from '@components/Modules/TableInformation/Partials/DefaultContentColumns.vue';
import DefaultContentActions from '@components/Modules/TableInformation/Partials/DefaultContentActions.vue';
</script>

<template>
  <div class="px-2">
    <DefaultContentTableName />
    <DefaultContentColumns class="mt-4" />
    <DefaultContentActions class="mt-2" />
  </div>
</template>
