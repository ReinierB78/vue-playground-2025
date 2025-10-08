<template>
  <main class="py-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-4">{{ t('buyProduct.title') }}</h1>
        <p class="leading-8 font-light" v-html="t('buyProduct.content')" />
        <div>
          <MultiStepForm />
        </div>
      </div>
      <div class=""></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import MultiStepForm from '@/components/organismns/MultiStepForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = useI18n()
</script>
