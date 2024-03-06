<script setup lang="ts">
import BaseSectionDropdown from '@components/Base/Forms/BaseSectionDropdown.vue';
import { tableCardinalities } from '@utilities/TableTypesHelper';

const { modelValue } = defineModels<{
  modelValue:
    | 'one-to-one'
    | 'one-to-many'
    | 'many-to-many'
    | 'many-to-one'
    | string;
}>();
</script>

<template>
  <BaseSectionDropdown
    id="panelFormCardinality"
    v-model="modelValue"
    :items="tableCardinalities"
  >
    <template #label>Select Cardinality:</template>
  </BaseSectionDropdown>
</template>
