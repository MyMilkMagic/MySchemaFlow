<script lang="ts" setup>
import { useCanvasStore } from '@stores/Canvas';
import SharedTrashIcon from '@components/Shared/Icons/SharedTrashIcon.vue';
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import SharedCloneIcon from '@components/Shared/Icons/SharedCloneIcon.vue';
import BaseTooltipLabel from '@components/Base/BaseTooltipLabel.vue';
import BaseSectionActionButtonIcon from '@components/Base/Forms/BaseSectionActionButtonIcon.vue';
import BaseTooltipWithShortcutKeys from '@components/Base/BaseTooltipWithShortcutKeys.vue';

const canvasStore = useCanvasStore();
const wrapper = ref<HTMLDivElement>();
const currentSelectedInd = ref(-1);
const onClickToggleActive = (ind: number) => {
  if (currentSelectedInd.value === ind) {
    currentSelectedInd.value = -1;
    return;
  }

  currentSelectedInd.value = ind;
};
const onClickCopyColumn = () => {
  canvasStore.cloneColumn(currentSelectedInd.value);
  currentSelectedInd.value = canvasStore.activeNodeColumns.length - 1;
};
const onClickDeleteColumn = () => {
  canvasStore.deleteColumn(currentSelectedInd.value);
  currentSelectedInd.value = -1;
};
onClickOutside(wrapper, () => {
  currentSelectedInd.value = -1;
});
</script>
<template>
  <div ref="wrapper">
    <p
      v-if="canvasStore.activeNodeColumns.length !== 0"
      class="mb-1 text-xs font-bold text-blue-950"
    >
      Columns: {{ canvasStore.activeNodeColumns.length }}
    </p>
    <button
      v-for="(column, ind) in canvasStore.activeNodeColumns"
      :key="column.name"
      class="group mb-1 flex w-full rounded-md px-2 py-2 text-[.6rem] font-extrabold outline-none last-of-type:mb-0"
      :class="{
        'bg-blue-500': currentSelectedInd === ind,
        'bg-slate-200 hover:bg-blue-100 focus-visible:bg-blue-100':
          currentSelectedInd !== ind,
      }"
      type="button"
      @click="onClickToggleActive(ind)"
      @dblclick="canvasStore.selectedColumnInd = ind"
    >
      <span
        class="w-8/12 truncate text-left"
        :class="{
          'text-blue-50': currentSelectedInd === ind,
          'text-slate-700 group-hover:text-blue-500 group-focus-visible:text-blue-500':
            currentSelectedInd !== ind,
        }"
      >
        {{ column.name }}</span
      >
      <span
        class="w-full truncate text-left"
        :class="{
          'text-blue-50': currentSelectedInd === ind,
          'text-slate-700 group-hover:text-blue-500 group-focus-visible:text-blue-500':
            currentSelectedInd !== ind,
        }"
      >
        {{ column.type }}</span
      >
      <span
        v-if="column.keyConstraint === 'PK' || column.keyConstraint === 'FK'"
        class="w-2/12"
        :class="{
          'text-white': currentSelectedInd === ind,
          'text-blue-500': currentSelectedInd !== ind,
        }"
        >{{ column.keyConstraint }}</span
      >
      <span v-else class="w-2/12"></span>
    </button>

    <div class="mt-2">
      <div class="flex">
        <BaseTooltipWithShortcutKeys class="mr-1">
          <BaseSectionActionButtonIcon>
            <SharedAddIcon />
          </BaseSectionActionButtonIcon>
          <template #tooltip>
            <BaseTooltipLabel>Add Column</BaseTooltipLabel>
          </template>
        </BaseTooltipWithShortcutKeys>
        <BaseTooltipWithShortcutKeys class="mr-1" @click="onClickCopyColumn">
          <BaseSectionActionButtonIcon :disabled="currentSelectedInd === -1">
            <SharedCloneIcon />
          </BaseSectionActionButtonIcon>
          <template #tooltip>
            <BaseTooltipLabel>Clone Column</BaseTooltipLabel>
          </template>
        </BaseTooltipWithShortcutKeys>
        <BaseTooltipWithShortcutKeys class="mr-1" @click="onClickDeleteColumn">
          <BaseSectionActionButtonIcon
            :disabled="currentSelectedInd === -1"
            color-scheme="danger"
          >
            <SharedTrashIcon />
          </BaseSectionActionButtonIcon>
          <template #tooltip>
            <BaseTooltipLabel>Delete Column</BaseTooltipLabel>
          </template>
        </BaseTooltipWithShortcutKeys>
      </div>
    </div>
  </div>
</template>
