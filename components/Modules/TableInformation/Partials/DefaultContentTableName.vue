<script lang="ts" setup>
import BaseSectionTextInput from '@components/Base/Forms/BaseSectionTextInput.vue';
import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
const tableName = computed({
  get() {
    return canvasStore.currentActiveNode.data.table.name;
  },
  set(value: string) {
    canvasStore.currentActiveNode.data.table.name = value;
  },
});
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
