<script setup lang="ts">
import BaseFloatingLayout from '@components/Base/BaseFloatingLayout.vue';
import SharedEllipsisIcon from '@components/Shared/Icons/SharedEllipsisIcon.vue';
import SharedTrashIcon from '@components/Shared/Icons/SharedTrashIcon.vue';
import SharedCloneIcon from '@components/Shared/Icons/SharedCloneIcon.vue';
import SharedRouteIcon from '@components/Shared/Icons/SharedRouteIcon.vue';
import ButtonOptionItem from '@components/Modules/Tables/Partials/ButtonOptionItem.vue';
import ButtonOptionItemDanger from '@components/Modules/Tables/Partials/ButtonOptionItemDanger.vue';
import { useTableJump } from '@composables/Canvas/useTableJump';
import { useDeleteNodeActions } from '@composables/Nodes/useDeleteNodeActions';

defineProps<{
  nodeId: string;
}>();
const showFloatingLayout = ref(false);
const optionsBtn = ref<HTMLButtonElement>();
const { jumpIntoView } = useTableJump();
const { deleteNodeById } = useDeleteNodeActions();
onClickOutside(optionsBtn, () => {
  showFloatingLayout.value = false;
});
</script>

<template>
  <BaseFloatingLayout :show-layout="showFloatingLayout" placement="right">
    <button
      ref="optionsBtn"
      class="block w-[11px] rounded p-1 hover:bg-blue-100 hover:stroke-blue-600 focus-visible:bg-blue-100 focus-visible:stroke-blue-600"
      :class="{
        'stroke-slate-700': !showFloatingLayout,
        'bg-blue-100 stroke-blue-600': showFloatingLayout,
      }"
      type="button"
      @click="showFloatingLayout = !showFloatingLayout"
    >
      <SharedEllipsisIcon />
    </button>
    <template #layout>
      <div
        class="overflow-hidden rounded border-[1px] border-slate-300 bg-white text-xs shadow-[0_4px_14px_-3px_rgba(0,0,0,0.08)]"
      >
        <ButtonOptionItem @click="jumpIntoView(nodeId)">
          <template #icon>
            <SharedRouteIcon />
          </template>
          <template #text>Locate Table</template>
        </ButtonOptionItem>
        <ButtonOptionItem>
          <template #icon>
            <SharedCloneIcon />
          </template>
          <template #text>Copy Table</template>
        </ButtonOptionItem>
        <ButtonOptionItemDanger @click="deleteNodeById(nodeId)">
          <template #icon>
            <SharedTrashIcon />
          </template>
          <template #text>Delete Table</template>
        </ButtonOptionItemDanger>
      </div>
    </template>
  </BaseFloatingLayout>
</template>
