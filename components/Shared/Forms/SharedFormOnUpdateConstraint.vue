<script setup lang="ts">
import BaseSectionDropdown from '@components/Base/Forms/BaseSectionDropdown.vue';
import { useCanvasStore } from '@stores/Canvas';
import { relationConstraints } from '@utilities/TableTypesHelper';
import { watch } from 'vue';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
const canvasStore = useCanvasStore();

// Everytime active node changes, reset model value
watch(
  () => canvasStore.currentActiveNode,
  () => {
    modelValue.value = '';
  },
);
</script>

<template>
  <BaseSectionDropdown
    id="addOnUpdateConstraint"
    v-model="modelValue"
    :items="relationConstraints"
  >
    <template #label>On Update:</template>
  </BaseSectionDropdown>
</template>
