<script lang="ts" setup>
import { useFloating, autoUpdate, shift, flip, offset } from '@floating-ui/vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { Placement } from '@floating-ui/vue';

type TProps = {
  showLayout: boolean;
  placement?: Placement;
  offset?: number;
};
const props = withDefaults(defineProps<TProps>(), {
  placement: 'bottom',
  offset: 0,
});
const referenceEl = ref<HTMLButtonElement>();
const floatingEl = ref<HTMLDivElement>();
const { floatingStyles } = useFloating(referenceEl, floatingEl, {
  placement: props.placement,
  middleware: [shift(), flip(), offset(props.offset)],
  whileElementsMounted: autoUpdate,
});
const { activate, deactivate } = useFocusTrap(floatingEl, {
  allowOutsideClick: true,
  returnFocusOnDeactivate: false,
});

watch(
  () => props.showLayout,
  async (showLayout) => {
    await nextTick();
    if (showLayout) activate();
    else deactivate();
  },
  { flush: 'post' },
);
</script>
<template>
  <div ref="referenceEl">
    <slot></slot>
    <Teleport to="body">
      <div
        v-if="showLayout"
        ref="floatingEl"
        class="absolute z-50 block"
        :style="floatingStyles"
      >
        <slot name="layout"></slot>
      </div>
    </Teleport>
  </div>
</template>
