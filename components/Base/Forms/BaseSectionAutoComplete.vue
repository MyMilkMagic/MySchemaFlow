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
const oldValue = ref(modelValue.value);
const referenceEl = ref<HTMLInputElement>();
const floatingEl = ref<InstanceType<typeof BaseScrollbar>>();
const buttonItems = ref();
const showFloatingLayout = ref(false);
const currentIndex = ref(findIndexOfSelectedType(props.list, modelValue.value));
const inputWrapper = ref<HTMLDivElement>();
const getList = computed(() => {
  return props.list.filter((list) => {
    return list.name.toLowerCase().includes(modelValue.value.toLowerCase());
  });
});
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
const updateScrollTop = async () => {
  await nextTick();
  const CurrentElement = buttonItems.value[currentIndex.value];
  const Scrollbar = floatingEl.value?.instance?.elements?.();
  if (!Scrollbar) return;
  Scrollbar.viewport.scrollTo({ top: CurrentElement.offsetTop });
};
const onFocusShowLayout = async () => {
  showFloatingLayout.value = true;
  currentIndex.value = findIndexOfSelectedType(getList.value, modelValue.value);
  await nextTick();
  if (currentIndex.value !== -1) {
    updateScrollTop();
  }

  if (currentIndex.value === -1 && modelValue.value.trim() !== '') {
    showFloatingLayout.value = false;
  }
};
const onKeydownSearchItem = async (e: KeyboardEvent) => {
  const Key = e.key.toLowerCase();

  // If user hits 'tab', do not allow it
  if (Key === 'tab') {
    e.preventDefault();
    return;
  }

  // When navigating down using keyboard
  if (Key === 'arrowdown') {
    if (getList.value.length === 0) return;

    e.preventDefault();

    if (currentIndex.value === getList.value.length - 1) {
      currentIndex.value = 0;
    } else {
      currentIndex.value++;
    }

    updateScrollTop();
    return;
  }

  // When navigating up using keyboard
  if (Key == 'arrowup') {
    if (getList.value.length === 0) return;
    e.preventDefault();

    if (currentIndex.value <= 0) {
      currentIndex.value = getList.value.length - 1;
    } else {
      currentIndex.value--;
    }

    updateScrollTop();
    return;
  }

  // Hide the floating layout when user hit 'enter' key
  if (Key === 'enter') {
    if (currentIndex.value === -1) return;
    modelValue.value = getList.value[currentIndex.value].name;
    oldValue.value = modelValue.value;
    showFloatingLayout.value = false;
    return;
  }

  // If user starts to delete a char, reset the button active state
  if (Key === 'backspace') {
    showFloatingLayout.value = false;
    currentIndex.value = -1;
    await nextTick();
    if (getList.value.length === 0) return;
    setTimeout(() => (showFloatingLayout.value = true), 50);
    return;
  }
};
const onKeyupSearchItem = async (e: KeyboardEvent) => {
  const Key = e.key.toLowerCase();

  if (getList.value.length === 0) {
    showFloatingLayout.value = false;
  }

  if (
    Key !== 'enter' &&
    getList.value.length !== 0 &&
    oldValue.value !== modelValue.value
  ) {
    showFloatingLayout.value = true;
  }
};
const onClickChooseDataType = () => {
  modelValue.value = getList.value[currentIndex.value].name;
  showFloatingLayout.value = false;
};
onClickOutside(inputWrapper, () => {
  showFloatingLayout.value = false;
  currentIndex.value = findIndexOfSelectedType(getList.value, modelValue.value);
});
watch(modelValue, (oldValue, newValue) => {
  if (oldValue !== newValue) {
    currentIndex.value = -1;
  }
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
        @keydown="onKeydownSearchItem"
        @keyup="onKeyupSearchItem"
      />

      <BaseScrollbar
        v-if="showFloatingLayout"
        ref="floatingEl"
        :style="floatingStyles"
        class="max-h-[150px] overflow-hidden rounded border-2 border-slate-200 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
      >
        <button
          v-for="(item, ind) in getList"
          :key="item.name"
          ref="buttonItems"
          type="button"
          class="group flex w-full outline-none hover:bg-blue-100 focus-visible:bg-blue-100"
          :class="{
            'bg-blue-100': currentIndex === ind,
          }"
          @click="onClickChooseDataType"
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
