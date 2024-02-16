<script lang="ts" setup>
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import Toolbar from '@components/Toolbar/Toolbar.vue';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { useVueFlow } from '@vue-flow/core';

provide(vueFlowKey, useVueFlow());
</script>

<template>
  <div class="font-dm">
    <Toolbar />
    <CanvasBoard />
  </div>
</template>
