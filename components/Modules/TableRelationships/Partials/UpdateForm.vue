<script setup lang="ts">
import BaseSectionAlertList from '@components/Base/Alerts/BaseSectionAlertList.vue';
import BaseSectionActionButton from '@components/Base/Forms/BaseSectionActionButton.vue';
import SharedEditIcon from '@components/Shared/Icons/SharedEditIcon.vue';
import SharedTrashIcon from '@components/Shared/Icons/SharedTrashIcon.vue';
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

const emits = defineEmits<{
  (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const VueFlow = inject(vueFlowKey);
const errors = ref<Array<string>>([]);
const { updateRelation, deleteRelation } = useEdgeRelationActions();

const referencingColumn = ref(
  canvasStore.currentActiveEdge.data.referencing.column,
);
const referencedTable = ref(
  canvasStore.currentActiveEdge.sourceNode.data.table.name,
);
const referencedColumn = ref(
  canvasStore.currentActiveEdge.data.referenced.column,
);
const onDeleteConstraint = ref(
  canvasStore.currentActiveEdge.data.constraint.onDelete,
);
const onUpdateConstraint = ref(
  canvasStore.currentActiveEdge.data.constraint.onUpdate,
);
const cardinality = ref(canvasStore.currentActiveEdge.data.cardinality);
const onClickHideForm = () => {
  canvasStore.currentActiveEdge = Object.assign({}, {});
  emits('goBack');
};
const onClickUpdateRelation = async () => {
  if (!VueFlow) return;
  errors.value = [];
  // Defaults to NO ACTION if not set
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
    'update',
  );
  if (errors.value.length !== 0) return;
  await updateRelation(RelationObj);
};
const onClickDeleteRelation = () => {
  deleteRelation();
  emits('goBack');
};

watch(referencedTable, () => {
  referencedColumn.value = ''; // Everytime referenced table is changing, reset the referenced column
});
</script>

<template>
  <div>
    <BaseSectionAlertList
      v-if="errors.length !== 0"
      class="my-4"
      color-scheme="danger"
      :items="errors"
    />
    <SharedSectionBackButton class="mb-4 mt-2" @click="onClickHideForm" />
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
    <BaseSectionActionButton class="mb-2 w-full" @click="onClickUpdateRelation">
      <template #icon>
        <SharedEditIcon />
      </template>
      Update Relation
    </BaseSectionActionButton>
    <BaseSectionActionButton
      type="danger"
      class="w-full"
      @click="onClickDeleteRelation"
    >
      <template #icon>
        <SharedTrashIcon />
      </template>
      Delete Relation
    </BaseSectionActionButton>
  </div>
</template>
