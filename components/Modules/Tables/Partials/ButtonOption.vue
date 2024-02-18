<script setup lang="ts">
import BaseFloatingLayout from '@components/Base/BaseFloatingLayout.vue';
import SharedEllipsisIcon from '@components/Shared/Icons/SharedEllipsisIcon.vue';
import SharedTrashIcon from '@components/Shared/Icons/SharedTrashIcon.vue';
import SharedCloneIcon from '@components/Shared/Icons/SharedCloneIcon.vue';
import ButtonOptionItem from '@components/Modules/Tables/Partials/ButtonOptionItem.vue';
import ButtonOptionItemDanger from '@components/Modules/Tables/Partials/ButtonOptionItemDanger.vue';

const showFloatingLayout = ref(false);
const optionsBtn = ref<HTMLButtonElement>();

onClickOutside(optionsBtn, () => {
  showFloatingLayout.value = false;
});
</script>

<template>
  <BaseFloatingLayout
    :show-layout="showFloatingLayout"
    :offset="3"
    placement="right"
  >
    <button
      ref="optionsBtn"
      class="block w-[19px] stroke-slate-700 px-2 group-hover:stroke-blue-600 group-focus:stroke-blue-600"
      type="button"
      @click="showFloatingLayout = !showFloatingLayout"
    >
      <SharedEllipsisIcon />
    </button>
    <template #layout>
      <div
        class="overflow-hidden rounded border-[1px] border-slate-300 bg-white text-xs shadow-[0_4px_14px_-3px_rgba(0,0,0,0.08)]"
      >
        <ButtonOptionItem>
          <template #icon>
            <SharedCloneIcon />
          </template>
          <template #text>Copy</template>
        </ButtonOptionItem>
        <ButtonOptionItemDanger>
          <template #icon>
            <SharedTrashIcon />
          </template>
          <template #text>Delete</template>
        </ButtonOptionItemDanger>
      </div>
    </template>
  </BaseFloatingLayout>
</template>
