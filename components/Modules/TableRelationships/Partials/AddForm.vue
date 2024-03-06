<script setup lang="ts">
import BaseSectionAlert from '@components/Base/Alerts/BaseSectionAlert.vue';
import BaseSectionAlertList from '@components/Base/Alerts/BaseSectionAlertList.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedAddIcon from '@components/Shared/Icons/SharedAddIcon.vue';
import SharedSectionBackButton from '@components/Shared/Buttons/SharedSectionBackButton.vue';
import SharedFormCurrentTableLabel from '@components/Shared/Forms/SharedFormCurrentTableLabel.vue';
import SharedFormReferencingColumn from '@components/Shared/Forms/SharedFormReferencingColumn.vue';
import SharedFormReferencedTable from '@components/Shared/Forms/SharedFormReferencedTable.vue';
import SharedFormReferencedColumn from '@components/Shared/Forms/SharedFormReferencedColumn.vue';
import SharedFormOnDeleteConstraint from '@components/Shared/Forms/SharedFormOnDeleteConstraint.vue';
import SharedFormOnUpdateConstraint from '@components/Shared/Forms/SharedFormOnUpdateConstraint.vue';
import SharedFormCardinality from '@components/Shared/Forms/SharedFormCardinality.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useEdgeRelationActions } from '@composables/Edges/useEdgeRelationActions';
import { validateTableRelations } from '@utilities/TableValidationHelper';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { nextTick, ref, inject } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
  (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const errors: Ref<Array<string>> = ref([]);
const referencingColumn = ref('');
const referencedTable = ref('');
const referencedColumn = ref('');
const onDeleteConstraint = ref('NO ACTION');
const onUpdateConstraint = ref('NO ACTION');
const cardinality = ref('');
const isSuccessfullyCreated = ref(false);
const VueFlow = inject(vueFlowKey);
const { addRelation } = useEdgeRelationActions();
const onClickAddRelation = async () => {
  if (!VueFlow) return;
  errors.value = [];
  isSuccessfullyCreated.value = false;
  const RelationObj = {
    referencingColumn: referencingColumn.value,
    referencedTable: referencedTable.value,
    referencedColumn: referencedColumn.value,
    constraint: {
      onDelete: onDeleteConstraint.value,
      onUpdate: onUpdateConstraint.value,
    },
    cardinality: cardinality.value,
  };
  errors.value = validateTableRelations(
    RelationObj,
    canvasStore.currentActiveNode,
    VueFlow.getNodes.value,
    VueFlow.getEdges.value,
    'add',
  );
  if (errors.value.length !== 0) return;
  addRelation(RelationObj);
  await nextTick();

  // Reset Fields
  referencingColumn.value = '';
  referencedTable.value = '';
  referencedColumn.value = '';
  onDeleteConstraint.value = '';
  onUpdateConstraint.value = '';
  cardinality.value = '';
  isSuccessfullyCreated.value = true;
};
</script>

<template>
  <div>
    <BaseSectionAlertList
      v-if="errors.length !== 0"
      class="my-4"
      color-scheme="danger"
      :items="errors"
    />
    <BaseSectionAlert v-if="isSuccessfullyCreated" class="my-4">
      You have successfully added a new table relation!
    </BaseSectionAlert>
    <SharedSectionBackButton class="mb-4 mt-2" @click="emits('goBack')" />
    <SharedFormCurrentTableLabel class="mb-4" />
    <SharedFormReferencingColumn v-model="referencingColumn" class="mb-4" />
    <SharedFormReferencedTable v-model="referencedTable" class="mb-4" />
    <SharedFormReferencedColumn
      v-model="referencedColumn"
      v-model:referenced-table="referencedTable"
      class="mb-4"
      :disabled="referencedTable.trim() === ''"
    />
    <SharedFormOnDeleteConstraint v-model="onDeleteConstraint" class="mb-4" />
    <SharedFormOnUpdateConstraint v-model="onUpdateConstraint" class="mb-4" />
    <SharedFormCardinality v-model="cardinality" class="mb-5" />
    <BaseSectionActionButton class="w-full" @click="onClickAddRelation">
      <template #icon>
        <SharedAddIcon />
      </template>
      Add Relation
    </BaseSectionActionButton>
  </div>
</template>
