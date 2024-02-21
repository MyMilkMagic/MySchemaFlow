<template>
  <button
    class="flex items-center justify-center rounded bg-blue-500 p-2 outline-none ring-0 transition-shadow hover:bg-blue-600/90 focus-visible:bg-blue-600/90 focus-visible:ring-4 focus-visible:ring-blue-500/50"
    type="button"
  >
    <span class="mr-1 flex w-[12px] stroke-white">
      <slot name="icon"></slot>
    </span>
    <span class="text-xs font-semibold text-white">
      <slot></slot>
    </span>
  </button>
</template>
