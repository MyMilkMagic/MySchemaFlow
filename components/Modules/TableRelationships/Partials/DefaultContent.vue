<script setup lang="ts">
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import DefaultContentRelationItem from '@components/Modules/TableRelationships/Partials/DefaultContentRelationItem.vue';
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useEdgeRelationship } from '@composables/Edges/useEdgeRelationship';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { inject } from 'vue';

const emits = defineEmits<{
  (e: 'addForm', value: Event): void;
  (e: 'editForm'): void;
}>();
const canvasStore = useCanvasStore();
const VueFlow = inject(vueFlowKey);
const { relationList } = useEdgeRelationship();

const onClickEditForm = (edgeId: string) => {
  if (!VueFlow) return;
  // No need to create shallow copy
  const Edge = VueFlow.getEdges.value.find((edge) => edge.id === edgeId);
  canvasStore.currentActiveEdge = Edge ? Edge : {};
  emits('editForm');
};
</script>

<template>
  <div>
    <div v-if="relationList.length !== 0" class="mb-4">
      <p class="mb-1.5 text-xs font-bold text-slate-600">
        Total: {{ relationList.length }}
      </p>
      <DefaultContentRelationItem
        v-for="relation in relationList"
        :key="relation.id"
        class="mb-2 last-of-type:mb-0"
        type="button"
        @dblclick="onClickEditForm(relation.id)"
      >
        <template #table>{{ relation.table }}</template>
        <template #column>{{ relation.column }}</template>
        <template #relation>{{ relation.relation }}</template>
      </DefaultContentRelationItem>
    </div>
    <BaseSectionActionButton class="w-full" @click="emits('addForm', $event)">
      <template #icon="">
        <SharedAddIcon />
      </template>
      Add Relation
    </BaseSectionActionButton>
  </div>
</template>
