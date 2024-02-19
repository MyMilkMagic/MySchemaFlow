<script lang="ts" setup>
import BaseSectionTextInput from '@components/Base/Forms/BaseSectionTextInput.vue';

const tableName = ref('');
</script>
<template>
  <BaseSectionTextInput
    id="tableNameTxtInput"
    v-model="tableName"
    placeholder="Place table's name here"
    class="mt-2"
  >
    <template #label>Table's Name:</template>
  </BaseSectionTextInput>
</template>
