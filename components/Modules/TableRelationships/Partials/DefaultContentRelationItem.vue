<template>
  <button
    class="group flex w-full rounded bg-slate-200 px-2 py-2 text-[.6rem] font-bold outline-none hover:bg-blue-100 focus-visible:bg-blue-100"
    type="button"
  >
    <span
      class="w-full max-w-[100px] flex-grow truncate text-left text-slate-700 group-hover:text-blue-800 group-focus-visible:text-blue-800"
    >
      <slot name="table"></slot>
    </span>
    <span
      class="w-full flex-grow text-slate-500 group-hover:text-blue-800 group-focus-visible:text-blue-800"
    >
      <slot name="column"></slot>
    </span>
    <span class="w-full flex-grow text-blue-600">
      <slot name="relation"></slot>
    </span>
  </button>
</template>
