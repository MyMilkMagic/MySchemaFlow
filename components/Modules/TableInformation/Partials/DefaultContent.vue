<script lang="ts" setup>
import DefaultContentTableName from '@components/Modules/TableInformation/Partials/DefaultContentTableName.vue';
import DefaultContentColumns from '@components/Modules/TableInformation/Partials/DefaultContentColumns.vue';

const emits = defineEmits<{
  (e: 'addColumn'): void;
}>();
</script>

<template>
  <div>
    <DefaultContentTableName />
    <DefaultContentColumns class="mt-4" @add-column="emits('addColumn')" />
  </div>
</template>
