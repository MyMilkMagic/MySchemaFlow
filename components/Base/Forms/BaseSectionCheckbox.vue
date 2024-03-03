<script lang="ts" setup="">
import SharedCheckboxIcon from '@components/Shared/Icons/SharedCheckboxIcon.vue';
import anime from 'animejs/lib/anime';

const props = defineProps<{
  name: string;
  id: string;
  value: string;
}>();
const { modelValue } = defineModels<{
  modelValue: boolean | Array<string>;
}>();
const isChecked = ref(modelValue.value);
const isFocused = ref(false);

const toggleCheckState = (event: Event) => {
  const Input = event.target as HTMLInputElement;
  isChecked.value = Input.checked;
};
const onEnter = (el: Element, done: () => void) => {
  const Paths = el.querySelectorAll('path');
  anime({
    targets: Paths,
    strokeDashoffset: [anime.setDashoffset, 46],
    easing: 'easeOutQuint',
    duration: 350,
    complete: done,
  });
};
const onLeave = (el: Element, done: () => void) => {
  const Paths = el.querySelectorAll('path');
  anime({
    targets: Paths,
    strokeDashoffset: [46, anime.setDashoffset],
    easing: 'easeOutQuint',
    duration: 350,
    complete: done,
  });
};

watch(modelValue, (modelValue) => {
  if (Array.isArray(modelValue)) {
    isChecked.value = modelValue.includes(props.value);
    return;
  }
  isChecked.value = modelValue;
});
</script>

<template>
  <div>
    <input
      :id="id"
      v-model="modelValue"
      :name="name"
      :value="value"
      type="checkbox"
      class="inline appearance-none"
      @change="toggleCheckState"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <label
      :for="id"
      class="group inline-flex cursor-pointer select-none items-center"
    >
      <span
        type="button"
        class="h-[20px] w-[20px] rounded border-2 p-1 ring-0 transition-shadow group-hover:border-blue-500 group-hover:bg-blue-100"
        :class="{
          'border-blue-500 bg-blue-100': isChecked,
          'border-slate-300 bg-slate-100': !isChecked && !isFocused,
          'border-blue-500 ring-4 focus-visible:ring-blue-500/50': isFocused,
        }"
      >
        <Transition @enter="onEnter" @leave="onLeave">
          <SharedCheckboxIcon v-if="isChecked" class="stroke-blue-500" />
        </Transition>
      </span>
      <span class="ml-1 text-sm font-semibold text-slate-900">
        <slot></slot>
      </span>
    </label>
  </div>
</template>
