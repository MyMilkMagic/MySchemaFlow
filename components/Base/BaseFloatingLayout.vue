<script lang="ts" setup>
import { useFloating, autoUpdate, shift, flip } from '@floating-ui/vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = defineProps<{
  showLayout: boolean;
}>();
const referenceEl = ref<HTMLButtonElement>();
const floatingEl = ref<HTMLDivElement>();
const { floatingStyles } = useFloating(referenceEl, floatingEl, {
  middleware: [shift(), flip()],
  whileElementsMounted: autoUpdate,
});
const { activate, deactivate } = useFocusTrap(floatingEl);

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
        class="absolute z-50 block overflow-hidden rounded border-[1px] border-slate-300 bg-white text-xs shadow-[0_4px_14px_-3px_rgba(0,0,0,0.08)]"
        :style="floatingStyles"
      >
        <slot name="layout"></slot>
      </div>
    </Teleport>
  </div>
</template>
