<template>
  <div
    v-if="open"
    class="w-full h-screen bg-gray-900 bg-opacity-80 z-20 absolute top-0 left-0 flex items-center justify-center"
  >
    <div class="bg-white w-full sm:w-[33%] rounded rounded-2">
      <div class="p-4 border-b">
        <slot name="title"></slot>
      </div>
      <div class="p-4">
        <slot name="content"></slot>
      </div>
      <div class="p-4 border-t">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()
</script>
