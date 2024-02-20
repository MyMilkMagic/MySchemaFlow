<template>
  <button
    class="font-dm group flex w-full items-center bg-rose-50 py-2.5 pl-3 pr-10 outline-none hover:bg-rose-100/80 focus-visible:bg-rose-100/80"
    type="button"
  >
    <span class="mr-1.5 flex w-[12px] stroke-rose-600">
      <slot name="icon"></slot>
    </span>
    <span class="text-xs font-bold text-rose-600">
      <slot name="text"></slot>
    </span>
  </button>
</template>
