<script setup lang="ts">
import BaseSectionTextInput from '@components/Base/Forms/BaseSectionTextInput.vue';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
</script>
<template>
  <div>
    <BaseSectionTextInput
      id="formColumnType"
      v-model="modelValue"
      placeholder="Place column's type here"
    >
      <template #label>Column Type:</template>
    </BaseSectionTextInput>
  </div>
</template>
