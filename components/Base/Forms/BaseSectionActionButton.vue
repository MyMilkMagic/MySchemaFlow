<template>
  <button
    class="flex items-center justify-center rounded bg-blue-500 px-2 py-3 outline-none ring-0 transition-shadow hover:bg-blue-600/90 focus-visible:bg-blue-600/90 focus-visible:ring-4 focus-visible:ring-blue-500/50"
    type="button"
  >
    <span class="mr-1.5 flex h-[10px] w-[10px] stroke-white">
      <slot name="icon"></slot>
    </span>
    <span class="text-xs font-semibold text-white">
      <slot></slot>
    </span>
  </button>
</template>
