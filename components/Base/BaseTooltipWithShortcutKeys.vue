<script lang="ts" setup>
import { useTooltip } from '@composables/Miscellaneous/useTooltip';
import type { Placement } from '@floating-ui/vue';

type TProps = {
  placement?: Placement;
};
const props = withDefaults(defineProps<TProps>(), {
  placement: 'bottom',
});
const referenceEl = ref<HTMLButtonElement>();
const floatingEl = ref<HTMLDivElement>();
const floatingArrow = ref<HTMLDivElement>();
const showTooltip = ref(false);
const { onBeforeEnter, onEnter, onLeave } = useTooltip(
  referenceEl,
  floatingEl,
  floatingArrow,
  props.placement,
);

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
        <div v-if="showTooltip" ref="floatingEl" class="absolute z-50">
          <div
            class="relative block max-w-[300px] rounded border-[1px] border-blue-500 bg-white px-3 py-2 text-xs shadow-[inset_0_-3px_0_0_#3b82f687]"
          >
            <span
              ref="floatingArrow"
              class="absolute block -translate-y-full border-[6px] border-transparent border-b-blue-500"
            />
            <slot name="tooltip"></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
