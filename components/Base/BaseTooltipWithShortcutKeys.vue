<script lang="ts" setup>
import { useTooltip } from '@composables/Miscellaneous/useTooltip';

const referenceEl = ref<HTMLButtonElement>();
const floatingEl = ref<HTMLDivElement>();
const floatingArrow = ref<HTMLDivElement>();
const showTooltip = ref(false);
const { arrowStyles, onBeforeEnter, onEnter, onLeave } = useTooltip(
  referenceEl,
  floatingEl,
  floatingArrow,
  showTooltip,
);
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
        <span
          v-if="showTooltip"
          ref="floatingEl"
          class="absolute z-50 block rounded border-[1px] border-blue-500 bg-white px-3 py-2 text-xs shadow-[inset_0_-3px_0_0_#3b82f687]"
        >
          <span
            ref="floatingArrow"
            :style="arrowStyles"
            class="absolute block -translate-y-full border-[6px] border-transparent border-b-blue-500"
          />

          <span class="font-semibold">
            <slot name="tooltip"></slot>
          </span>
          <span></span>
          <span></span>
        </span>
      </Transition>
    </Teleport>
  </div>
</template>
