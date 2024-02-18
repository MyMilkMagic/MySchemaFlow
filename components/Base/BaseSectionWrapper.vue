<script setup lang="ts">
import SharedChevronIcon from '@components/Shared/Icons/SharedChevronIcon.vue';
import anime from 'animejs/lib/anime.es.js';

const chevronIcon = ref<HTMLSpanElement>();
const displayContent = ref(true);

const onClickToggleWrapper = () => {
  displayContent.value = !displayContent.value;

  if (!displayContent.value) {
    anime({
      targets: chevronIcon.value,
      rotate: -90,
      easing: 'easeOutExpo',
      duration: 750,
    });
    return;
  }

  anime({
    targets: chevronIcon.value,
    rotate: 0,
    easing: 'easeOutExpo',
    duration: 750,
  });
};
</script>
<template>
  <div>
    <button
      class="group flex w-full items-center justify-between border-b-2 bg-slate-200 px-2 py-2 outline-none hover:bg-blue-100 focus:bg-blue-100"
      :class="{
        'border-b-slate-400/50': !displayContent,
        'border-b-transparent': displayContent,
      }"
      type="button"
      @click="onClickToggleWrapper"
    >
      <span
        class="text-xs font-bold text-slate-600 group-hover:text-blue-600 group-focus:text-blue-600"
        ><slot name="label"></slot
      ></span>
      <span
        ref="chevronIcon"
        class="w-[10px] stroke-slate-600 group-hover:stroke-blue-600 group-focus:stroke-blue-600"
      >
        <SharedChevronIcon />
      </span>
    </button>

    <div v-if="displayContent" class="overflow-hidden px-2">
      <slot></slot>
    </div>
  </div>
</template>
