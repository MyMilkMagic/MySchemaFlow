<script lang="ts" setup>
import SharedSectionBackButton from '@components/Shared/Buttons/SharedSectionBackButton.vue';
import SharedFormColumnName from '@components/Shared/Forms/SharedFormColumnName.vue';
import SharedFormColumnType from '@components/Shared/Forms/SharedFormColumnType.vue';
import SharedFormAllowNull from '@components/Shared/Forms/SharedFormAllowNull.vue';
import SharedFormUnique from '@components/Shared/Forms/SharedFormUnique.vue';
import ShareFormPrimaryKey from '@components/Shared/Forms/ShareFormPrimaryKey.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedEditIcon from '@components/Shared/Icons/SharedEditIcon.vue';

import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
const columnName = ref(canvasStore.currentSelectedColumnData?.name ?? '');
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
</script>
<template>
  <div class="mt-2">
    <SharedSectionBackButton @click="canvasStore.selectedColumnInd = -1" />
    <div class="mt-2">
      <SharedFormColumnName v-model="columnName" class="mb-1" />
      <SharedFormColumnType v-model="columnType" />
      <SharedFormAllowNull v-model="columnAllowNull" class="mt-4" />
      <SharedFormUnique v-model="columnUnique" class="mt-2" />
      <ShareFormPrimaryKey v-model="columnPrimaryKey" class="mt-2" />
      <BaseSectionActionButton class="mt-2 w-full">
        <template #icon>
          <SharedEditIcon />
        </template>
        Update Column
      </BaseSectionActionButton>
    </div>
  </div>
</template>
