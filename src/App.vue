<template>
  <div class="flex-col flex justify-between h-screen relative">
    <div class="sm:px-0">
      <NavBar />
      <div class="max-w-6xl mx-auto">
        <RouterView v-slot="{ Component }">
          <Transition name="route" mode="out-in" appear>
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { Footer, NavBar, OverlayModal } from '@/components/organisms'
import { useModal } from '@/composables/useModal'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const modal = useModal()
</script>

<style>
/* Fade transition */
/*
.route-enter-active,
.route-leave-active {
  transition: opacity 0.3s ease;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
*/
/* Optional: Slide transition 
   Uncomment this and comment out the fade transition above to use slide instead */

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
