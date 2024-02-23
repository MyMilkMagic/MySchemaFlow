<script setup lang="ts">
import ControlsBaseButton from '@components/Modules/CanvasBoard/Partials/ControlsBaseButton.vue';
import SharedLockIcon from '@components/Shared/Icons/SharedLockIcon.vue';
import SharedUnlockIcon from '@components/Shared/Icons/SharedUnlockIcon.vue';
import SharedZoomInIcon from '@components/Shared/Icons/SharedZoomInIcon.vue';
import SharedZoomOutIcon from '@components/Shared/Icons/SharedZoomOutIcon.vue';
import SharedFullScreenIcon from '@components/Shared/Icons/SharedFullScreenIcon.vue';
import { useCanvasControls } from '@composables/Canvas/useCanvasControls';
import { Controls } from '@vue-flow/controls';

const {
  zoomLevel,
  isInteractive,
  zoomIn,
  zoomOut,
  runFitView,
  toggleInteractive,
} = useCanvasControls();
let zoomInInterval = 0;
let zoomOutInterval = 0;

const onMouseDownZoomIn = () => {
  zoomIn();
  if (zoomInInterval !== 0) return;
  zoomInInterval = window.setInterval(() => {
    if (zoomLevel.value >= 1) {
      window.clearInterval(zoomInInterval);
      zoomInInterval = 0;
    }
    zoomIn();
  }, 150);
};
const onMouseUpStopZoomIn = () => {
  window.clearInterval(zoomInInterval);
  zoomInInterval = 0;
};
const onMouseDownZoomOut = () => {
  zoomOut();
  zoomOutInterval = window.setInterval(() => {
    if (zoomLevel.value <= 0.1) {
      window.clearInterval(zoomOutInterval);
      zoomOutInterval = 0;
    }
    zoomOut();
  }, 150);
};
const onMouseUpStopZoomOut = () => {
  window.clearInterval(zoomOutInterval);
  zoomOutInterval = 0;
};
</script>

<template>
  <Controls
    class="flex overflow-hidden rounded-md border-2 border-slate-200 bg-white"
  >
    <template #control-zoom-in>
      <ControlsBaseButton
        :disabled="zoomLevel >= 1"
        @mousedown="onMouseDownZoomIn"
        @mouseup="onMouseUpStopZoomIn"
      >
        <SharedZoomInIcon />
        <template #tooltip>Zoom In</template>
      </ControlsBaseButton>
    </template>
    <template #control-zoom-out>
      <ControlsBaseButton
        :disabled="zoomLevel <= 0.1"
        @mousedown="onMouseDownZoomOut"
        @mouseup="onMouseUpStopZoomOut"
      >
        <SharedZoomOutIcon />
        <template #tooltip>Zoom Out</template>
      </ControlsBaseButton>
    </template>
    <template #control-fit-view>
      <ControlsBaseButton @click="runFitView">
        <SharedFullScreenIcon />
        <template #tooltip>Fit to View</template>
      </ControlsBaseButton>
    </template>
    <template #control-interactive>
      <ControlsBaseButton @click="toggleInteractive">
        <SharedUnlockIcon v-if="isInteractive" />
        <SharedLockIcon v-else />

        <template #tooltip>
          {{ !isInteractive ? 'Unlock Interactivity' : 'Lock Interactivity' }}
        </template>
      </ControlsBaseButton>
    </template>
  </Controls>
</template>
