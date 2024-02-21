<script lang="ts" setup>
import BaseSectionCheckbox from '@components/Base/Forms/BaseSectionCheckbox.vue';

const { modelValue } = defineModels<{
  modelValue: boolean | Array<string>;
}>();
</script>

<template>
  <BaseSectionCheckbox
    id="formAllowNullCheckbox"
    v-model="modelValue"
    name="formAllowNullCheckbox"
  >
    Null
  </BaseSectionCheckbox>
</template>
