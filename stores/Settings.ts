import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    currentOrientation: 'TB',
    zoomLevel: 1,
    enableTableJumpAnimation: true,
  }),
  getters: {
    getZoomLevelInPercentage(state) {
      return state.zoomLevel * 100;
    },
  },
});
