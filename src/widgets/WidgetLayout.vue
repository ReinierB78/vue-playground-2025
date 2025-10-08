<template>
  <div class="border rounded-xl shadow flex flex-col justify-between">
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
</template>

<script setup lang="ts"></script>
