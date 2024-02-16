<script lang="ts" setup>
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { useVueFlow } from '@vue-flow/core';

provide(vueFlowKey, useVueFlow());
</script>

<template>
  <p class="font-dm-mono text-3xl">Hello</p>
  <CanvasBoard />
</template>
