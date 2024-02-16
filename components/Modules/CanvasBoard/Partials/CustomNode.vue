<script lang="ts" setup>
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  data: TNodeData;
}>();

console.log(props.data);
</script>
<template>
  <div>
    <div>
      <p>{{ data.table.name }}</p>
      <button
        v-for="column in data.table.columns"
        :key="column.name"
        type="button"
        class="flex"
      >
        <span>{{ column.name }}</span>
        <span>{{ column.type }}</span>
      </button>
    </div>
  </div>
</template>
