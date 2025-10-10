<template>
  <div class="flex items-center justify-center space-x-2 p-4">
    <!-- Primary circle -->
    <div
      class="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
      :class="{ 'opacity-50': loading }"
    ></div>

    <!-- Secondary circle (delayed) -->
    <div
      class="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
      :class="{ 'opacity-50': loading }"
      style="animation-delay: 0.2s"
    ></div>

    <!-- Tertiary circle (more delayed) -->
    <div
      class="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
      :class="{ 'opacity-50': loading }"
      style="animation-delay: 0.4s"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean | undefined
}>()
</script>

<style>
@keyframes custom-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1rem);
  }
}

.animate-bounce {
  animation: custom-bounce 1s infinite;
}
</style>
