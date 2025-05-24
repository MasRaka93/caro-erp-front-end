<template>
  <RouterLink
    :to="to"
    class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight transition-colors hover:bg-gray-300 hover:text-gray-800 rounded-md px-3 py-1"
  >
    <component :is="icon" class="w-5 h-5" />
    <span class="sidebar-text hidden md:inline">{{ label }}</span>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  to: String,
  icon: Object,
  label: String,
});
</script>
