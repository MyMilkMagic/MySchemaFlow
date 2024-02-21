<script setup lang="ts">
import BaseSectionTextInput from '@components/Base/Forms/BaseSectionTextInput.vue';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
</script>
<template>
  <div>
    <BaseSectionTextInput
      id="formColumnName"
      v-model="modelValue"
      placeholder="Place column's name here"
    >
      <template #label>Column Name:</template>
    </BaseSectionTextInput>
  </div>
</template>
