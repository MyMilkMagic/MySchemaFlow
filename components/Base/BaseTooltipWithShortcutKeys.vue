<script lang="ts" setup>
import { useTooltip } from '@composables/Miscellaneous/useTooltip';

const referenceEl = ref<HTMLButtonElement>();
const floatingEl = ref<HTMLDivElement>();
const floatingArrow = ref<HTMLDivElement>();
const showTooltip = ref(false);
const { arrowStyles, floatingStyles, onBeforeEnter, onEnter, onLeave } =
  useTooltip(referenceEl, floatingEl, floatingArrow, showTooltip);

defineExpose({
  showTooltip,
});
</script>
<template>
  <div
    ref="referenceEl"
    @mouseenter="showTooltip = true"
    @focus="showTooltip = true"
    @mouseleave="showTooltip = false"
    @blur="showTooltip = false"
  >
    <slot></slot>
    <Teleport to="body">
      <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-if="showTooltip"
          ref="floatingEl"
          class="absolute z-50 block rounded border-[1px] border-blue-500 bg-white px-3 py-2 text-xs shadow-[inset_0_-3px_0_0_#3b82f687]"
          :style="floatingStyles"
        >
          <span
            ref="floatingArrow"
            :style="arrowStyles"
            class="absolute block -translate-y-full border-[6px] border-transparent border-b-blue-500"
          />
          <slot name="tooltip"></slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
