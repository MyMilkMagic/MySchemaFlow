<script setup lang="ts">
import BaseSectionAutoComplete from '@components/Base/Forms/BaseSectionAutoComplete.vue';
import { sqlDataTypes } from '@records/SQLTypes';
import BaseSectionTextInput from '@components/Base/Forms/BaseSectionTextInput.vue';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
const types = computed(() =>
  sqlDataTypes.map((sql) => ({ name: sql.name, description: sql.description })),
);
</script>
<template>
  <div>
    <BaseSectionAutoComplete
      id="formColumnType"
      v-model="modelValue"
      placeholder="Place column's type here"
      :list="types"
    >
      <template #label> Column Type:</template>
    </BaseSectionAutoComplete>
  </div>
</template>
