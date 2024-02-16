<script lang="ts" setup>
import ImportFile from '@components/Modules/Toolbar/Partials/ImportFile.vue';
import ExportFile from '@components/Modules/Toolbar/Partials/ExportFile.vue';
import CreateTable from '@components/Modules/Toolbar/Partials/CreateTable.vue';
import RunAutoLayout from '@components/Modules/Toolbar/Partials/RunAutoLayout.vue';
import LayoutChanger from '@components/Modules/Toolbar/Partials/LayoutChanger.vue';
import SaveButton from '@components/Modules/Toolbar/Partials/SaveButton.vue';
import Redo from '@components/Modules/Toolbar/Partials/Redo.vue';
import Undo from '@components/Modules/Toolbar/Partials/Undo.vue';
</script>
<template>
  <nav
    class="flex items-center justify-between border-b-2 border-b-slate-300 bg-white px-4 py-2.5"
  >
    <div class="flex items-center">
      <Undo class="mr-2" />
      <Redo class="mr-2" />
      <SaveButton />
    </div>
    <div class="flex">
      <CreateTable class="mr-1" />
      <RunAutoLayout class="mr-1" />
      <LayoutChanger />
    </div>
    <div class="flex">
      <ImportFile class="mr-1" />
      <ExportFile />
    </div>
  </nav>
</template>
