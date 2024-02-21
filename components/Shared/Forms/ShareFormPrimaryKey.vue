<script lang="ts" setup>
import BaseSectionCheckbox from '@components/Base/Forms/BaseSectionCheckbox.vue';

const { modelValue } = defineModels<{
  modelValue: boolean | Array<string>;
}>();
</script>

<template>
  <BaseSectionCheckbox
    id="formAllowPrimaryCheckbox"
    v-model="modelValue"
    name="formAllowPrimaryCheckbox"
    value="formAllowPrimaryCheckbox"
  >
    Primary Key
  </BaseSectionCheckbox>
</template>
