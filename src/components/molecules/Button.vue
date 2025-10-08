<template>
  <button
    @click="onClick"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    :class="[
      props.loading ? 'opacity-50 cursor-not-allowed' : '',
      props.fullWidth ? 'w-[100%]' : 'w-auto'
    ]"
    :disabled="props.loading"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  handleClick: () => void
  loading?: boolean
  fullWidth?: boolean
}>()

const onClick = () => {
  props.handleClick()
}
</script>
