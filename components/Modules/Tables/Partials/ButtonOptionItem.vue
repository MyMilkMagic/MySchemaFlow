<template>
  <button
    class="group flex w-full items-center py-2.5 pl-3 pr-10 font-dm outline-none hover:bg-blue-100 focus-visible:bg-blue-100"
    type="button"
  >
    <span
      class="mr-1.5 flex w-[12px] stroke-slate-700 group-hover:stroke-blue-600 group-focus-visible:stroke-blue-600"
    >
      <slot name="icon"></slot>
    </span>
    <span
      class="text-xs font-bold text-slate-700 group-hover:text-blue-600 group-focus-visible:text-blue-600"
    >
      <slot name="text"></slot>
    </span>
  </button>
</template>
