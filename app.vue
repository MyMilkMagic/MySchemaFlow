<script lang="ts" setup>
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { useVueFlow } from '@vue-flow/core';
import { provide } from 'vue';

provide(vueFlowKey, useVueFlow());
</script>

<template>
  <CanvasBoard />
</template>
