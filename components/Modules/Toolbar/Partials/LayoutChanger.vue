<script lang="ts" setup>
import SharedHorizontalOrientationIcon from '@components/Shared/Icons/SharedHorizontalOrientationIcon.vue';
import SharedVerticalOrientationIcon from '@components/Shared/Icons/SharedVerticalOrientationIcon.vue';
import BaseButton from '@components/Modules/Toolbar/Partials/BaseButton.vue';
</script>
<template>
  <BaseButton>
    <SharedHorizontalOrientationIcon v-if="false" />
    <SharedVerticalOrientationIcon v-else />
  </BaseButton>
</template>
