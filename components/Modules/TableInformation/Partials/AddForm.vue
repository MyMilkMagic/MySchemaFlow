<script setup lang="ts">
import SharedSectionBackButton from '@components/Shared/Buttons/SharedSectionBackButton.vue';
import ShareFormPrimaryKey from '@components/Shared/Forms/ShareFormPrimaryKey.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import SharedFormColumnName from '@components/Shared/Forms/SharedFormColumnName.vue';
import SharedFormColumnType from '@components/Shared/Forms/SharedFormColumnType.vue';
import SharedFormAllowNull from '@components/Shared/Forms/SharedFormAllowNull.vue';
import SharedFormUnique from '@components/Shared/Forms/SharedFormUnique.vue';

const emits = defineEmits<{
  (e: 'goBack'): void;
}>();
const columnName = ref('');
const columnType = ref('');
const columnAllowNull = ref(false);
const columnUnique = ref(false);
const columnPrimaryKey = ref(false);

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
      <SharedFormColumnName v-model="columnName" class="mb-1" />
      <SharedFormColumnType v-model="columnType" />
      <SharedFormAllowNull v-model="columnAllowNull" class="mt-4" />
      <SharedFormUnique v-model="columnUnique" class="mt-2" />
      <ShareFormPrimaryKey v-model="columnPrimaryKey" class="mt-2" />
      <BaseSectionActionButton class="mt-2 w-full">
        <template #icon>
          <SharedAddIcon />
        </template>
        Add Column
      </BaseSectionActionButton>
    </div>
  </div>
</template>
