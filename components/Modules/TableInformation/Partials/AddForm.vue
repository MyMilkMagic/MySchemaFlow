<script setup lang="ts">
import BaseSectionAlertList from '@components/Base/Alerts/BaseSectionAlertList.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedSectionBackButton from '@components/Shared/Buttons/SharedSectionBackButton.vue';
import ShareFormPrimaryKey from '@components/Shared/Forms/ShareFormPrimaryKey.vue';
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import SharedFormColumnName from '@components/Shared/Forms/SharedFormColumnName.vue';
import SharedFormColumnType from '@components/Shared/Forms/SharedFormColumnType.vue';
import SharedFormAllowNull from '@components/Shared/Forms/SharedFormAllowNull.vue';
import SharedFormUnique from '@components/Shared/Forms/SharedFormUnique.vue';
import { useCanvasStore } from '@stores/Canvas';
import { validateColumns } from '@utilities/TableValidationHelper';

const emits = defineEmits<{
  (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const errors = ref<Array<string>>([]);
const columnName = ref('');
const columnType = ref('');
const columnAllowNull = ref(false);
const columnUnique = ref(false);
const columnPrimaryKey = ref(false);

const onClickCreateColumn = () => {
  const ColumnData = {
    name: columnName.value,
    type: columnType.value,
    isNull: columnAllowNull.value,
    isUnique: columnUnique.value,
    isPrimaryKey: columnPrimaryKey.value,
  };
  errors.value = validateColumns(ColumnData, canvasStore.currentActiveNode);
  // Then create new one
};
watch(columnPrimaryKey, (isPrimaryKey) => {
  if (isPrimaryKey) {
    columnUnique.value = false;
    columnAllowNull.value = false;
  }
});
watch(columnAllowNull, (columnAllowNull) => {
  if (columnAllowNull) {
    columnPrimaryKey.value = false;
  }
});
watch(columnUnique, (columnUnique) => {
  if (columnUnique) {
    columnPrimaryKey.value = false;
  }
});
</script>
<template>
  <div class="mt-2">
    <SharedSectionBackButton @click="emits('goBack')" />

    <div class="mt-2">
      <BaseSectionAlertList
        v-if="errors.length !== 0"
        :items="errors"
        color-scheme="danger"
        class="mb-2 mt-4"
      />

      <SharedFormColumnName v-model="columnName" class="mb-1" />
      <SharedFormColumnType v-model="columnType" />
      <SharedFormAllowNull v-model="columnAllowNull" class="mt-4" />
      <SharedFormUnique v-model="columnUnique" class="mt-2" />
      <ShareFormPrimaryKey v-model="columnPrimaryKey" class="mt-2" />
      <BaseSectionActionButton class="mt-2 w-full" @click="onClickCreateColumn">
        <template #icon>
          <SharedAddIcon />
        </template>
        Add Column
      </BaseSectionActionButton>
    </div>
  </div>
</template>
