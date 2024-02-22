<script setup lang="ts">
import BaseScrollbar from '@components/Base/BaseScrollbar.vue';
import { useFloating, autoUpdate, shift, flip, size } from '@floating-ui/vue';
import { findIndexOfSelectedType } from '@utilities/ColumnTypeHelper';

const props = defineProps<{
  list: Array<{ name: string; description: string }>;
  placeholder: string;
  id: string;
}>();
const { modelValue } = defineModels<{
  modelValue: string;
}>();
const referenceEl = ref<HTMLInputElement>();
const floatingEl = ref<InstanceType<typeof BaseScrollbar>>();
const buttonItems = ref();
const showFloatingLayout = ref(false);
const currentIndex = ref(findIndexOfSelectedType(props.list, modelValue.value));
const inputWrapper = ref<HTMLDivElement>();
let layoutDelayId = 0;

const { floatingStyles } = useFloating(referenceEl, floatingEl, {
  middleware: [
    shift(),
    flip(),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
  whileElementsMounted: autoUpdate,
});
const updateScrollTop = async (shouldFocus: boolean = false) => {
  await nextTick();
  const CurrentElement = buttonItems.value[currentIndex.value];
  const Scrollbar = floatingEl.value?.instance.elements();
  Scrollbar.scrollEventElement.scrollTop = CurrentElement.offsetTop;
  await nextTick();
  if (shouldFocus) {
    CurrentElement.focus();
  }
};
const onFocusShowLayout = async () => {
  showFloatingLayout.value = true;
  await nextTick();
  if (currentIndex.value !== -1) {
    updateScrollTop();
  }
};
const onKeydown = async (e: KeyboardEvent) => {
  if (!showFloatingLayout.value) return;

  // When navigating down using keyboard
  if (e.key.toLowerCase() === 'arrowdown') {
    e.preventDefault();

    if (currentIndex.value === props.list.length - 1) {
      currentIndex.value = 0;
    } else {
      currentIndex.value += 1;
    }

    updateScrollTop(true);
  }

  // When navigating up using keyboard
  if (e.key.toLowerCase() == 'arrowup') {
    e.preventDefault();

    if (currentIndex.value <= 0) {
      currentIndex.value = props.list.length - 1;
    } else {
      currentIndex.value--;
    }

    updateScrollTop(true);
  }

  // Unfocused input element when 'tab' key is pressed
  if (e.key.toLowerCase() === 'tab') {
    currentIndex.value = currentIndex.value === -1 ? 0 : currentIndex.value;
    const InputEl = e.target as HTMLElement;
    InputEl.blur();
    updateScrollTop();
  }
};
const onEnterChooseDataType = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() !== 'enter') return;
  modelValue.value = props.list[currentIndex.value].name;
  showFloatingLayout.value = false;
};
const onBlurHideLayout = async () => {
  await nextTick();
  if (!floatingEl.value) return;
  const Scrollbar = floatingEl.value.$el;
  // Need to add delay, otherwise, current document.activeElement cannot be detected
  clearTimeout(layoutDelayId);
  layoutDelayId = window.setTimeout(() => {
    if (!Scrollbar.contains(document.activeElement)) {
      showFloatingLayout.value = false;
    }
  }, 100);
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
onClickOutside(inputWrapper, () => {
  showFloatingLayout.value = false;
  currentIndex.value = findIndexOfSelectedType(props.list, modelValue.value);
});
</script>

<template>
  <div>
    <label :for="id" class="cursor-pointer text-xs font-bold text-blue-950">
      <slot name="label"></slot>
    </label>
    <div ref="inputWrapper">
      <input
        :id="id"
        ref="referenceEl"
        v-model="modelValue"
        class="w-full rounded border-2 border-slate-300 px-2 py-2 text-xs font-bold text-blue-950 placeholder-slate-400 outline-none ring-0 ring-blue-500/50 transition-shadow hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-4"
        type="text"
        :placeholder="placeholder"
        @focus="onFocusShowLayout"
        @keydown="onKeydown"
      />

      <BaseScrollbar
        v-if="showFloatingLayout"
        ref="floatingEl"
        :style="floatingStyles"
        class="h-[150px] overflow-hidden rounded border-2 border-slate-200 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
      >
        <button
          v-for="(item, ind) in list"
          :key="item.name"
          ref="buttonItems"
          type="button"
          class="group flex w-full outline-none hover:bg-blue-100 focus-visible:bg-blue-100"
          :class="{
            'bg-blue-100': currentIndex === ind,
          }"
          @focus="currentIndex = ind"
          @keydown="onEnterChooseDataType"
          @blur="onBlurHideLayout"
        >
          <span
            class="w-6/12 truncate px-2 py-1.5 text-left text-xs font-semibold group-hover:text-blue-500 group-focus-visible:text-blue-500"
            :class="{
              'text-slate-900': currentIndex !== ind,
              'text-blue-500': currentIndex === ind,
            }"
            >{{ item.name }}</span
          >
          <span
            class="w-6/12 truncate px-2 py-1.5 text-left text-xs font-semibold group-hover:text-blue-950 group-focus-visible:text-blue-950"
            :class="{
              'text-slate-500': currentIndex !== ind,
              'text-blue-950': currentIndex === ind,
            }"
            >{{ item.description }}</span
          >
        </button>
      </BaseScrollbar>
    </div>
  </div>
</template>
