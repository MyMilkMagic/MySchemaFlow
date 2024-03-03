<script lang="ts" setup>
import BaseSectionAlertList from '@components/Base/Alerts/BaseSectionAlertList.vue';
import BaseSectionAlert from '@components/Base/Alerts/BaseSectionAlert.vue';
import SharedSectionBackButton from '@components/Shared/Buttons/SharedSectionBackButton.vue';
import SharedFormColumnName from '@components/Shared/Forms/SharedFormColumnName.vue';
import SharedFormColumnType from '@components/Shared/Forms/SharedFormColumnType.vue';
import SharedFormAllowNull from '@components/Shared/Forms/SharedFormAllowNull.vue';
import SharedFormUnique from '@components/Shared/Forms/SharedFormUnique.vue';
import ShareFormPrimaryKey from '@components/Shared/Forms/ShareFormPrimaryKey.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedEditIcon from '@components/Shared/Icons/SharedEditIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useUpdateColumnInActiveNode } from '@composables/Edges/useUpdateColumnInActiveNode';
import { validateColumns } from '@utilities/TableValidationHelper';
import { formatColumnDataType } from '@utilities/ColumnTypeHelper';

const errors = ref<Array<string>>([]);
const showSuccessAlert = ref(false);
const canvasStore = useCanvasStore();
const columnName = ref(canvasStore.currentSelectedColumnData?.name ?? '');
const originalColumnName = ref(
  canvasStore.currentSelectedColumnData?.name ?? '',
);
const columnType = ref(canvasStore.currentSelectedColumnData?.type ?? '');
const columnAllowNull = ref(
  canvasStore.currentSelectedColumnData?.isNull ?? false,
);
const columnUnique = ref(
  canvasStore.currentSelectedColumnData?.isUnique ?? false,
);
const columnPrimaryKey = ref(
  canvasStore.currentSelectedColumnData.keyConstraint === 'PK',
);
const { updateColumnName } = useUpdateColumnInActiveNode();

const onClickUpdateColumn = () => {
  const ColumnData = {
    name: columnName.value,
    originalColumnName: originalColumnName.value,
    type: columnType.value,
    isNull: columnAllowNull.value,
    isUnique: columnUnique.value,
    isPrimaryKey: columnPrimaryKey.value,
  };
  errors.value = [];
  showSuccessAlert.value = false;
  errors.value = validateColumns(ColumnData, canvasStore.currentActiveNode);
  if (errors.value.length !== 0) return;
  ColumnData.type = formatColumnDataType(columnType.value);
  columnType.value = ColumnData.type;
  updateColumnName(originalColumnName.value, columnName.value);
  originalColumnName.value = columnName.value;

  canvasStore.selectedColumnInd = canvasStore.updateColumnInActiveNode(
    ColumnData,
    canvasStore.selectedColumnInd,
  );
  showSuccessAlert.value = true;
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
    <BaseSectionAlertList
      v-if="errors.length !== 0"
      :items="errors"
      color-scheme="danger"
      class="mb-2 mt-4"
    />
    <BaseSectionAlert v-if="showSuccessAlert" class="mb-2 mt-4">
      You have successfully created a new column!
    </BaseSectionAlert>

    <SharedSectionBackButton @click="canvasStore.selectedColumnInd = -1" />
    <div class="mt-2">
      <SharedFormColumnName v-model="columnName" class="mb-1" />
      <SharedFormColumnType v-model="columnType" />
      <SharedFormAllowNull v-model="columnAllowNull" class="mt-4" />
      <SharedFormUnique v-model="columnUnique" class="mt-2" />
      <ShareFormPrimaryKey v-model="columnPrimaryKey" class="mt-2" />
      <BaseSectionActionButton class="mt-2 w-full" @click="onClickUpdateColumn">
        <template #icon>
          <SharedEditIcon />
        </template>
        Update Column
      </BaseSectionActionButton>
    </div>
  </div>
</template>
